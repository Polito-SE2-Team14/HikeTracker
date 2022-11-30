const express = require("express");
const router = express.Router();
const pLotController = require("../Controller/ParkingLotController");
const { body, validationResult } = require("express-validator");

router.get("", async (req, res) => {
	await pLotController
		.getAllParkingLots()
		.then((parkingLots) => {
			return res.status(200).json(parkingLots);
		})
		.catch((err) => {
			console.error(err)
			return res.status(500).end()
		});
});

router.post("",
	body(["name", "province","municipality"]).not().isEmpty().trim().escape(),
	body(["longitude", "latitude"]).isFloat().not().isEmpty().trim().escape(),
	body("carspace").isInt({ min: 0 }).not().isEmpty().trim().escape(),
	async (req, res) => {

		console.log(req.body)


		if (!validationResult(req).isEmpty()) {
			console.error(validationResult(req).array())
			return res.status(422).json({ err: validationResult(req).array })
		}

		await pLotController
			.addParkingLot(req.body)
			.then(() => res.status(200).end())
			.catch((err) => {
				console.error(err)
				return res.status(500).end()
			});
	});

router.delete("/:pLotId",
	body("pLotId").isInt({ min: 0 }).not().isEmpty(),
	async (req, res) => {

		if (!validationResult(req).isEmpty()) {
			console.error(validationResult(req).array())
			return res.status(422).json({ err: validationResult(req).array })
		}

		let found = await pLotController.parkingLotExists(req.params.pLotId)
			.catch(err => {
				console.error(err)
				return res.status(404).json({ error: err })
			});

		if (!found) {
			return res.status(404).json({ error: `No parking lot has id ${req.params.pLotId}` });
		}

		await pLotController
			.deleteParkingLot(req.params.pLotId)
			.then(() => { res.status(200).end() })
			.catch(err => {
				console.error(err)
				return res.status(503).json({ err: `Could not remove parking lot ${req.params.pLotId}: ${err}` })
			});
	});

module.exports = router;