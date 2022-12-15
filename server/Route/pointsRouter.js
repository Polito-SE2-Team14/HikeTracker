const express = require('express');
const router = express.Router()
const { check, validationResult } = require('express-validator');
const pointController = require("../Controller/PointController")
const { errorResponse } = require("./utils")

router.get('', async (req, res) => {
	await pointController.getAllPoints()
		.then(points => res.json(points))
		.catch((err) => {
			return errorResponse(err, 500, res)
		});
});

router.get('/:pointID',
	check("pointID").not().isEmpty().isInt({ min: 0 }),
	async (req, res) => {
		await pointController.getPoint(req.params.pointID)
			.then(point => res.json(point))
			.catch((err) => {
				return errorResponse(err, 500, res)
			});
	});

module.exports = router;
