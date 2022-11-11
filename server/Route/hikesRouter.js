const express = require('express');
const router = express.Router()
// const prefixRoute = '/api/';
//const hikeDAO = require('../DAO/hikeDAO');
const HikeController = require('../Controller/HikeController')
const hikeController = new HikeController()
const PointController = require('../Controller/PointController')
const pointController = new PointController()
const { body, validationResult } = require('express-validator');

// GET request to /api/hikes to obtain a list of all hikes
router.get('', async (req, res) => {
	await hikeController.getAllHikes()
		.then((hikes) => { return res.status(200).json(hikes) })
		.catch(() => res.status(500).end());
});

// GET request to /api/hikes/:hikeID to obtain the selected hike
router.get('/:hikeID',
	body('hikeID').not().isEmpty().trim().escape(),
	async (req, res) => {
		await hikeController.getHike(req.params.hikeID)
			.then((hike) => { return res.status(200).json(hike) })
			.catch(() => res.status(500).end());
	});

//GET request to /api/hikes/:hikeID/points to obtain points of the selected hike
router.get('/:hikeID/points/',
	body('hikeID').not().isEmpty().trim().escape(),
	async (req, res) => {

		const hikeID = req.params.hikeID;

		await pointController.getHikePoints(hikeID)
			.then(points => res.json(points))
			.catch(err => res.status(err.code).send(err.msg))
	})


// POST request to /api/hikes to add a new hike
router.post('',
	body("title").not().isEmpty().trim().escape(),
	body("description").not().isEmpty().trim().escape(),
	body("difficulty").not().isEmpty().trim().escape(),
	body("length").isInt({ gt: 0 }),
	body("expectedTime").isInt({ gt: 0 }),
	body("ascent").isInt({ gt: 0 }),
	async (req, res) => {

		if (validationResult(req).isEmpty())
			return res.status(505).json(errors.array())

		await hikeController.addHike(req.body.hike)
			.then(() => res.status(201).json(req.body.hike))
			.catch(err =>
				res.status(503).json({ error: `Database error during the adding of hike ${req.body.hike.hikeID} in the database` }))
	})

// PUT request to /api/hikes to update an existing hike
router.put('',
	body("title").not().isEmpty().trim().escape(),
	body("description").not().isEmpty().trim().escape(),
	body("difficulty").not().isEmpty().trim().escape(),
	body("length").isInt({ gt: 0 }),
	body("expectedTime").isInt({ gt: 0 }),
	body("ascent").isInt({ gt: 0 }),
	async (req, res) => {
		if (validationResult(req).isEmpty())
			return res.status(505).json(errors.array())

		if (!check_hike(req.body.hike.hikeID))
			res.status(404).json({ error: `No hike with the given ID found` });

		await hikeController.updateHike(req.body.hike)
			.then((hike) => res.json(hike))
			.catch(err => res.status(404).json({ error: "Hike not found" }))
	})

module.exports = router;
