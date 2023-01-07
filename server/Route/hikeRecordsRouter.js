const express = require("express");
const router = express.Router();
const hikeRecordsController = require("../Controller/HikeRecordsController");
const { check, validationResult } = require("express-validator");
const { errorResponse } = require("./utils");

//GET api to get all the records of a user
router.get("/:userID",
	check(["userID"]).not().isEmpty().trim().escape(),
	check(["userID"]).isInt({ min: 0 }),
	async (req, res) => {

		const errors = validationResult(req);
		if (!errors.isEmpty())
			return errorResponse(errors.array(), 422, res);

		const userID = req.params.userID;
		await hikeRecordsController
			.getRecords(userID)
			.then((records) => res.status(200).json(records))
			.catch((err) => errorResponse(err, 500, res));
	});

//GET api to get a record of a user with status open
router.get("/:userID/status/open",
	check(["userID"]).not().isEmpty().trim().escape(),
	check(["userID"]).isInt({ min: 0 }),
	async (req, res) => {

		const errors = validationResult(req);
		if (!errors.isEmpty())
			return errorResponse(errors.array(), 422, res);

		const userID = req.params.userID;
		await hikeRecordsController
			.getRecordByStatusOpen(userID)
			.then((record) => {
				record ? res.status(200).json(record) : res.status(204).send();
			})
			.catch((err) => errorResponse(err, 500, res));
	});

//POST api to add a new record
router.post("",
	check(["userID", "hikeID", "startDate"]).not().isEmpty().trim().escape(),
	check(["userID", "hikeID"]).isInt({ min: 0 }),
	async (req, res) => {

		const errors = validationResult(req);
		if (!errors.isEmpty())
			return errorResponse(errors.array(), 422, res);

		const record = req.body;
		await hikeRecordsController
			.addNewRecord(record)
			.then(() => res.status(204).send())
			.catch((err) => errorResponse(err, 500, res));
	});

//PUT api to edit the status of a record
router.put("",
	check(["userID", "hikeID", "startDate", "endDate"]).not().isEmpty().trim().escape(),
	check(["userID", "hikeID"]).isInt({ min: 0 }),
	async (req, res) => {

		const errors = validationResult(req);
		if (!errors.isEmpty())
			return errorResponse(errors.array(), 422, res);

		const record = req.body;
		await hikeRecordsController
			.editRecord(record)
			.then(() => res.status(204).send())
			.catch((err) => errorResponse(err, 500, res));
	});

module.exports = router;
