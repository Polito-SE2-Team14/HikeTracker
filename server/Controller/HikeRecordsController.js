const hikeRecordsDAO = require('../DAO/hikeRecordsDAO')


//get all the records
exports.getRecords = async (userID) => {
    const records = await hikeRecordsDAO.getRecords(userID)
    return records
}

//add a new record
exports.addNewRecord = async (record) => {
    record.status = "open"
    record.endDate = null
    await hikeRecordsDAO.addNewRecord(record)
}

//edit a record
exports.editRecord = async (record) => {
    record.status = "completed"
    await hikeRecordsDAO.editRecord(record)
}