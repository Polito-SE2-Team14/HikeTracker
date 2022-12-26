import REST from "./REST";

const api = "/hikeRecords";

const getHikeRecordsForUser = async (userID) => {
	try {
		let response = await REST.GET(api + "/" + userID);
		let returnedJson = await response.json();

		return returnedJson;

	} catch (err) {
		console.error("Error in HikeRecordsAPI.js", err)
		throw err;
	}
}

const getHikeRecordForUserWithStatusOpen = async (userID) => {
	try {
		let response = await REST.GET(api + "/" + userID + "/status/open");
		let returnedJson = await response.json();

		return returnedJson;

	} catch (err) {
		console.error("Error in HikeRecordsAPI.js", err)
		throw err;
	}
}

const addNewRecord = async (record) => {

	await REST.UPDATE("POST", api, record, true)
		.catch((err) => {
			console.error("Error in HikeRecordsAPI.js", err)
			throw err;
		})

	return true
}

const updateRecord = async (record) => {
	try {
		await REST.UPDATE("PUT", api, record, true)
		return true;
	} catch (err) {
		console.error("Error in HikeRecordsAPI.js", err)
		throw err;
	}
}

const HikeRecordsAPI = { getHikeRecordsForUser, addNewRecord, updateRecord, getHikeRecordForUserWithStatusOpen }

export default HikeRecordsAPI;