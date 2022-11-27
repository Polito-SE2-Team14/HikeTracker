const express = require("express");
const router = express.Router();
// const prefixRoute = '/api/';
//const hikeDAO = require('../DAO/hikeDAO');
const HikeController = require("../Controller/HikeController");
const hikeController = new HikeController();
const PointController = require("../Controller/PointController");
const pointController = new PointController();
const { body, validationResult } = require("express-validator");
//const Hike = require("../Class/Hike");
const { check_hike } = require("../DAO/hikeDAO");

// GET request to /api/hikes to obtain a list of all hikes
router.get("", async (req, res) => {
	await hikeController
		.getAllHikes()
		.then((hikes) => {
			return res.status(200).json(hikes);
		})
		.catch((err) => {
			console.error(err)
			return res.status(500).end()
		});
});

// GET request to /api/hikes/:hikeID to obtain the selected hike
router.get(
	"/:hikeID",
	body("hikeID").not().isEmpty().isInt({ min: 0 }),
	async (req, res) => {
		await hikeController
			.getHike(req.params.hikeID)
			.then((hike) => {
				return res.status(200).json(hike);
			})
			.catch((err) => {
				console.error(err)
				return res.status(500).end()
			});
	}
);

//GET request to /api/hikes/:hikeID/points to obtain points of the selected hike
router.get(
	"/:hikeID/points/",
	body("hikeID").not().isEmpty().isInt({ min: 0 }),
	async (req, res) => {
		const hikeID = req.params.hikeID;

		await pointController
			.getHikePoints(hikeID)
			.then((points) => res.json(points))
			.catch((err) => {
				console.error(err);
				return res.status(500).end
			});
	}
);

// GET request to /api/hikes/:hikeID/track to obtain coordinates of track points of selected track
router.get(
	"/:hikeID/track",
	body("hikeID").not().isEmpty().isInt({ min: 0 }),
	async (req, res) => {
		const hikeID = req.params.hikeID;

		await hikeController
			.getHikeTrack(hikeID)
			.then((track) => res.json(track))
			.catch((err) => {
				console.error(err);
				return res.status(500).end
			});
	}
)

// POST request to /api/hikes to add a new hike
router.post("",
	body(["title", "difficulty", "municipality", "province"]).not().isEmpty().trim().escape(),
	body(["description"]).optional().trim().escape(),
	//body(["length", "expectedTime", "ascent"]).not().isEmpty(),
	async (req, res) => {
		const errors = validationResult(req);
		//console.log(req.body)
		if (!errors.isEmpty()) return res.status(505).json(errors.array());

		let newHike = req.body;
		newHike.hikeID = null;

		await hikeController
			.addHike(newHike)
			.then((msg) => {
				//console.log(msg);
				return res.status(201).json(msg);
			})
			.catch((err) => {
				console.error(err);
				return res.status(500).end
			});

	}
);


// PUT request to /api/hikes to update an existing hike
router.put("",
	body(["hikeID", "length", "expectedTime", "ascent"]).not().isEmpty().isInt({ min: 0 }),
	body(["title", "description", "difficulty", "municipality", "province"]).not().isEmpty().trim().escape(),
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			console.log(errors.array());
			return res.status(422).json(errors.array());
		}

		let present = check_hike(req.body.hikeID);
		if (!present) {
			return res.status(404).json({ error: `No hike with the given ID found` });
		}

		let hike = req.body

		console.log("update", req.body)

		await hikeController
			.updateHike(hike)
			.then((msg) => {
				res.status(201).json(msg);
			})
			.catch((err) => {
				console.error(err);
				return res.status(500).end
			});
	}
);

router.put("/start",
	body(["hikeID", "startPointID"]).not().isEmpty().isInt({ min: 0 }),
	async (req, res) => {

		await hikeController.setStart(req.body.hikeID, req.body.startPointID)
			.then(() => {
				res.status(201).end();
			})
			.catch((err) => {
				console.error(err);
				return res.status(500).end
			});

	})

router.put("/end",
	body(["hikeID", "endPointID"]).not().isEmpty().isInt({ min: 0 }),
	async (req, res) => {

		await hikeController.setEnd(req.body.hikeID, req.body.endPointID)
			.then(() => res.status(201).end())
			.catch((err) => {
				console.error(err);
				return res.status(500).end
			});
	}


)


router.delete("/:hikeID",
	body("hikeID").not().isEmpty().isInt({ min: 0 }),
	async (req, res) => {

		let present = await check_hike(req.params.hikeID)
			.catch(err => { return res.status(404).json({ error: err }) })
		if (!present) {
			return res.status(404).json({ error: `No hike with the given ID found` });
		}

		await hikeController
			.deleteHike(req.params.hikeID)
			.then((msg) => {
				res.status(201).json(msg);
			})
			.catch((err) => {
				console.error(err);
				return res.status(500).end
			});

	});

	module.exports = router;
