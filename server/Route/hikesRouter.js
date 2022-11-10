const { application } = require('express');
const express = require('express');
const router = express.Router()
// const prefixRoute = '/api/';
//const hikeDAO = require('../DAO/hikeDAO');
const HikeController = require('../Controller/HikeController')
const hikeController = new HikeController()

/**
 * tells if the an hike has a correct format
 * @param {hike} hike - the hike to validate
 * @returns {boolean} parameter indicating if the hike is valid
 */
function validateHike(hike) {
	if (hike.title === "" | hike.title === null | hike.title === undefined) {
		return false;
	}
	if (hike.description === "" | hike.description === null | hike.description === undefined) {
		return false;
	}

	if (hike.difficulty === "" | hike.difficulty === null | hike.difficulty === undefined) {
		return false;
	}
	if (hike.lenght <= 0 | hike.expectedTime <= 0 | hike.ascent <= 0) {
		return false;
	}
	return true;
}


// hike calls

// GET request to /api/hikes to obtain a list of all hikes
router.get('', async (req, res) => {
	await hikeController.getAllHikes()
		.then((hikes) => { return res.status(200).json(hikes) })
		.catch(() => res.status(500).end());
});

// GET request to /api/hikes/:hikeID to obtain the selected hike
router.get('', async (req, res) => {
	await controller.getHike(req.params.hikeID)
		.then((hike) => { return res.status(200).json(hike) })
		.catch(() => res.status(500).end());
});


// POST request to /api/hikes to add a new hike
router.post('', async (req, res) => {
	if (!validateHike(req.body.hike)) {
		res.status(404).json({ error: "Incorrect hike format" });
	}
	await hikeController.addHike(req.body.hike)
		.then(() => res.status(201).json(req.body.hike))
		.catch(err => res.status(503)
			.json({ error: `Database error during the adding of hike ${req.body.hike.hikeID} in the database` }));
})

// PUT request to /api/hikes to update an existing hike
router.put('', async (req, res) => {
	if (!validateHike(req.body.hike)) {
		res.status(404).json({ error: "Incorrect hike format" });
	}

	if (!check_hike(req.body.hike.hikeID))
		res.status(404).json({ error: `No hike with the given ID found` });

	await hikeController.updateHike(req.body.hike)
		.then((hike) => res.json(hike))
		.catch(err => res.status(404).json({ error: "Hike not found" }))
})

module.exports = router;
