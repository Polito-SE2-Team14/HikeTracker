const hikeRecordsDAO = require('../DAO/hikeRecordsDAO')
const dayjs = require("dayjs")


//get all the records
exports.getRecords = async (userID) => {

    if (isNaN(userID))
        throw new Error("invalid userID");

    const records = await hikeRecordsDAO.getRecords(userID)
    return records
}

exports.getRecordByStatusOpen = async (userID) => {
    const records = await hikeRecordsDAO.getRecordWithStatusOpen(userID)
    return records
}

//add a new record
exports.addNewRecord = async (record) => {

    if (isNaN(record.userID))
        throw new Error("invalid userID");
    if (isNaN(record.hikeID))
        throw new Error("invalid hikeID");
    if (!dayjs(record.startDate).isValid())
        throw new Error("invalid startDate");


    record.status = "open"
    record.endDate = null
    await hikeRecordsDAO.addNewRecord(record)
}

//edit a record
exports.editRecord = async (record) => {

    if (isNaN(record.userID))
        throw new Error("invalid userID");
    if (isNaN(record.hikeID))
        throw new Error("invalid hikeID");
    if (!dayjs(record.startDate).isValid())
        throw new Error("invalid startDate");
    if (!dayjs(record.endDate).isValid())
        throw new Error("invalid endDate");

    record.status = "completed"
    await hikeRecordsDAO.editRecord(record)
}