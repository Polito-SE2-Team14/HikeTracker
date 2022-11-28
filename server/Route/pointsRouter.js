const express = require('express');
const router = express.Router()
const { body, validationResult } = require('express-validator');
const PointController = require("../Controller/PointController")
const pointController = new PointController();

router.get('', async (req, res) => {
	await pointController.getAllPoints()
		.then(points => res.json(points))
		.catch((err) => {
			console.error(err);
			return res.status(500).end
		});});


router.get('/huts', async (req, res) => {
	await pointController.getHuts()
	.then(huts => { /* console.log("huts", huts) */; return res.status(200).json(huts) })
	.catch((err) => {
		console.error(err);
		return res.status(500).end
	});

});

router.get('/:pointID',
	body("pointID").not().isEmpty().isInt({ min: 0 }),
	async (req, res) => {
		await pointController.getPoint(req.params.pointID)
			.then(points => res.json(points))
			.catch((err) => {
				console.error(err);
				return res.status(500).end
			});	});

router.post('/huts',
	body(["name", "address", "province", "municipality"]).not().isEmpty().trim().escape(),
	body(["longitude", "latitude"]).isFloat().not().isEmpty().trim().escape(),
	body(["bedspace", "hutOwnerID"]).isInt({ min: 0 }).not().isEmpty().trim().escape(),
	async (req, res) => {

		if (!validationResult(req).isEmpty()) {
			console.error(validationResult(req).array())
			return res.status(422).json({ err: validationResult(req).array })
		}

		await pointController.createHut(req.body)
			.then(hut => res.status(204).json(hut))
			.catch((err) => {
				console.error(err);
				return res.status(500).end
			});	});

router.put('/huts',
	body(["pointID", "bedspace", "hutOwnerID"]).isInt({ min: 0 }).not().isEmpty().trim().escape(),
	body(["name", "address", "province", "municipality"]).not().isEmpty().trim().escape(),
	body(["latitude", "longitude"]).isFloat().not().isEmpty().trim().escape(),
	async (req, res) => {

		if (!validationResult(req).isEmpty()) {
			console.error(validationResult(req).array())
			return res.status(422).json({ err: validationResult(req).array })
		}

		await pointController.updateHut(req.body)
			.then(hut => res.status(204).send())
			.catch((err) => {
				console.error(err);
				return res.status(500).end
			});	});


router.delete('/huts/:hutID',
	body("hutID").not().isEmpty().isInt({ min: 0 }),
	async (req, res) => {
		await pointController.deleteHut(req.params.hutID)
			.then(() => res.status(204).send())
			.catch((err) => {
				console.error(err);
				return res.status(500).end
			});
	})

/* router.get('/parkinglots', async (req, res) => {
	await pointController.getParkingLots()
		.then(parkingLots => res.json(parkingLots))
		.catch(err => res.status(err.code).send(err.msg))
});

router.post('/parkinglots', async (req, res) => {

	const parkingLot = req.body.parkingLot;

	await pointsDAO.createParkingLot(parkingLot)
		.then(() => res.status(200).end())
		.catch(err => res.status(err.code).send(err.msg))
}); */

module.exports = router;
