const express = require("express");
const router = express.Router();
const pLotController = require("../Controller/ParkingLotController");
const { check, validationResult } = require("express-validator");
const { errorResponse, errorResponseJson } = require("./utils")

router.get("", async (req, res) => {
	await pLotController
		.getAllParkingLots()
		.then((parkingLots) => {
			return res.status(200).json(parkingLots);
		})
		.catch((err) => {
			return errorResponse(err, 500, res)
		});
});

router.post("",
	check(["name", "province", "municipality"]).not().isEmpty().trim().escape(),
	check(["longitude", "latitude"]).isFloat().not().isEmpty().trim().escape(),
	check("carspace").isInt({ min: 0 }).not().isEmpty().trim().escape(),
	async (req, res) => {

		if (!validationResult(req).isEmpty()) {
			return errorResponseJson(validationResult(req).array(), 422, res)

		}

		await pLotController
			.addParkingLot(req.body)
			.then(() => res.status(200).end())
			.catch((err) => {
				return errorResponse(err, 500, res)
			});
	});

router.delete("/:pLotId",
	check("pLotId").isInt({ min: 0 }).not().isEmpty(),
	async (req, res) => {

		if (!validationResult(req).isEmpty()) {
			return errorResponseJson(validationResult(req).array(), 422, res)
		}

		let found = await pLotController.parkingLotExists(req.params.pLotId)
			.catch(err => {
				return errorResponse(err, 500, res)
			});

		if (!found) {
			return errorResponseJson(`No parking lot has id ${req.params.pLotId}`, 404, res)
		}

		await pLotController
			.deleteParkingLot(req.params.pLotId)
			.then(() => { res.status(200).end() })
			.catch(err => {
				return errorResponseJson(`Could not remove parking lot ${req.params.pLotId}: ${err}`, 503, res)
			});
	});

module.exports = router;