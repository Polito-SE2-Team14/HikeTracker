const express = require("express");
const router = express.Router();
const hikeRecordsController = require("../Controller/HikeRecordsController");
const { check, validationResult } = require("express-validator");
const { errorResponse } = require("./utils")

//GET api to get all the records of a user
router.get('/:userID', async (req, res) => {
    const userID = req.params.userID
    await hikeRecordsController.getRecords(userID)
        .then(records => res.status(200).json(records))
        .catch(err => errorResponse(err, 500, res))
})

//GET api to get a record of a user with status open
router.get('/:userID/status/open', async (req, res) => {
    const userID = req.params.userID
    await hikeRecordsController.getRecordByStatusOpen(userID)
        .then(record => res.status(200).json(record))
        .catch(err => errorResponse(err, 500, res))
})

//POST api to add a new record
router.post('', async (req, res) => {
    const record = req.body
    await hikeRecordsController.addNewRecord(record)
        .then(() => res.status(204).send())
        .catch(err => errorResponse(err, 500, res))
})

//PUT api to edit the status of a record
router.put('', async (req, res) => {
    const record = req.body
    await hikeRecordsController.editRecord(record)
        .then(() => res.status(204).send())
        .catch(err => errorResponse(err, 500, res))
})


module.exports = router;
