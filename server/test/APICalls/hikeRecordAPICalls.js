'use strict'

const axios = require('axios');

class HikeRecordAPICall {
	#baseURL;

	constructor() {
		this.#baseURL = "http://localhost:3001/api";
	}

	//GET
	async getRecords(userID) {
		const url = this.#baseURL + "/hikeRecords/" + userID;
		let response;

		await axios.get(url, { responseType: "json" })
			.then(value => response = value)
			.catch(error => response = error.response);

		return response;
	}

	async getOpenRecords(userID) {
		const url = this.#baseURL + "/hikeRecords/" + userID + '/status/open';
		let response;

		await axios.get(url, { responseType: "json" })
			.then(value => response = value)
			.catch(error => response = error.response);

		return response;
	}


	//POST
	async addRecord(userID,hikeID,startDate) {
		const url = this.#baseURL + "/hikeRecords";

		const body = {
			userID: userID,
			hikeID: hikeID,
			startDate: startDate,
		};

		const headers = { headers: { 'Content-Type': 'application/json' } };
		let response;

		await axios.post(url, body, headers)
			.then(value => response = value)
			.catch(error => response = error.response);

		return response;
	}

	//PUT
		async editRecord(userID,hikeID,startDate,endDate) {
		const url = this.#baseURL + "/hikeRecords";

		const body = {
			userID: userID,
			hikeID: hikeID,
			startDate: startDate,
			endDate: endDate,
			
		};

		const headers = { headers: { 'Content-Type': 'application/json' } };
		let response;

		await axios.post(url, body, headers)
			.then(value => response = value)
			.catch(error => response = error.response);

		return response;
	}
}

module.exports = HikeRecordAPICall;