const express = require('express');
const router = express.Router()
const { body, validationResult } = require('express-validator');
const PointController = require("../Controller/PointController")
const pointController = new PointController();

router.get('', async (req, res) => {
	await pointsDAO.getAllPoints()
		.then(points => res.json(points))
		.catch(err => res.status(err.code).send(err.msg))
});

router.get('/huts', async (req, res) => {
	await pointController.getHuts()
		.then(huts => {res.status(200).json(huts)})
		.catch(err => res.status(err.code).send(err.msg))
});

router.post('/huts',
	body("name").not().isEmpty().trim().escape(),
	body("address").not().isEmpty().trim().escape(),
	body("longitude").isFloat().not().isEmpty().trim().escape(),
	body("latitude").isFloat().not().isEmpty().trim().escape(),
	body("bedspace").isInt().not().isEmpty().trim().escape(),
	body("hutOwnerID").isInt().not().isEmpty().trim().escape(),
	async (req, res) => {

		//console.log("hutTestBody",req.body)

		if (!validationResult(req).isEmpty()) {
			//console.log(validationResult(req).array())
			return res.status(422).json({ err: validationResult(req).array })
		}

		await pointController.createHut(req.body)
			.then(hut => res.status(204).json(hut))
			.catch(err => { console.log(err); res.status(505).send(err) })
	});

router.get('/parkinglots', async (req, res) => {
	await pointController.getParkingLots()
		.then(parkingLots => res.json(parkingLots))
		.catch(err => res.status(err.code).send(err.msg))
});

router.post('/parkinglots', async (req, res) => {

	const parkingLot = req.body.parkingLot;

	await pointsDAO.createParkingLot(parkingLot)
		.then(() => res.status(200).end())
		.catch(err => res.status(err.code).send(err.msg))
});

module.exports = router;
