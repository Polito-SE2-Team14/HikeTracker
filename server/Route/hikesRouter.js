const express = require("express");
const router = express.Router();
// const prefixRoute = '/api/';
//const hikeDAO = require('../DAO/hikeDAO');
const HikeController = require("../Controller/HikeController");
const hikeController = new HikeController();
const PointController = require("../Controller/PointController");
const pointController = new PointController();
const { body, validationResult } = require("express-validator");
const Hike = require("../Class/Hike");
const { check_hike } = require("../DAO/hikeDAO");

// GET request to /api/hikes to obtain a list of all hikes
router.get("", async (req, res) => {
	await hikeController
		.getAllHikes()
		.then((hikes) => {
			return res.status(200).json(hikes);
		})
		.catch(() => res.status(500).end());
});

// GET request to /api/hikes/:hikeID to obtain the selected hike
router.get(
	"/:hikeID",
	body("hikeID").not().isEmpty().trim().escape(),
	async (req, res) => {
		await hikeController
			.getHike(req.params.hikeID)
			.then((hike) => {
				return res.status(200).json(hike);
			})
			.catch(() => res.status(500).end());
	}
);

//GET request to /api/hikes/:hikeID/points to obtain points of the selected hike
router.get(
	"/:hikeID/points/",
	body("hikeID").not().isEmpty().trim().escape(),
	async (req, res) => {
		const hikeID = req.params.hikeID;

		await pointController
			.getHikePoints(hikeID)
			.then((points) => res.json(points))
			.catch((err) => res.status(err.code).send(err.msg));
	}
);

// POST request to /api/hikes to add a new hike
router.post(
	"",
	body("title").not().isEmpty().trim().escape(),
	body("description").not().isEmpty().trim().escape(),
	body("difficulty").not().isEmpty().trim().escape(),
	body("length").isInt({ gt: 0 }),
	body("expectedTime").isInt({ gt: 0 }),
	body("ascent").isInt({ gt: 0 }),
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) return res.status(505).json(errors.array());

		let newHike = new Hike(
			null,
			req.body.title,
			req.body.length,
			req.body.expectedTime,
			req.body.ascent,
			req.body.difficulty,
			req.body.description,
			req.body.startPointID,
			req.body.endPointID
		);

		await hikeController
			.addHike(newHike)
			.then((msg) => {console.log(msg); return res.status(201).json(msg);})
			.catch((err) =>
				res.status(503).json({
					error: `Database error during the adding of new hike in the database: ${err}`,
				})
			);
	}
);

// PUT request to /api/hikes to update an existing hike
router.put(
	"",
	body("hikeID").not().isEmpty().isInt({gt:0}),
	body("title").not().isEmpty().trim().escape(),
	body("description").not().isEmpty().trim().escape(),
	body("difficulty").not().isEmpty().trim().escape(),
	body("length").isInt({ gt: 0 }),
	body("expectedTime").isInt({ gt: 0 }),
	body("ascent").isInt({ gt: 0 }),
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) return res.status(505).json(errors.array());

		let present = check_hike(req.body.hikeID);
		if(!present){
			return res.status(404).json({ error: `No hike with the given ID found` });
		}

		let hike = new Hike(
			req.body.hikeID,
			req.body.title,
			req.body.length,
			req.body.expectedTime,
			req.body.ascent,
			req.body.difficulty,
			req.body.description,
			req.body.startPointID,
			req.body.endPointID
		);

		await hikeController
			.updateHike(hike)
			.then((msg) => {res.status(201).json(msg)})
			.catch((err) =>
				res.status(503).json({
					error: `Database error during update of hike ${hike.hikeID}: ${err}`,
				})
			);
	}
);

module.exports = router;
