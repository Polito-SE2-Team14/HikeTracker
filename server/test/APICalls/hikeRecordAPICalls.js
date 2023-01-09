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

	async getOpenRecord(userID) {
		const url = this.#baseURL + "/hikeRecords/" + userID + '/status/open';
		let response;

		await axios.get(url, { responseType: "json" })
			.then(value => response = value)
			.catch(error => response = error.response);

		return response;
	}


	//POST
	async addRecord(body) {
		const url = this.#baseURL + "/hikeRecords";

		const headers = { headers: { 'Content-Type': 'application/json' } };
		let response;

		await axios.post(url, body, headers)
			.then(value => response = value)
			.catch(error => response = error.response);

		return response;
	}

	//PUT
		async editRecord(body) {
		const url = this.#baseURL + "/hikeRecords";

		const headers = { headers: { 'Content-Type': 'application/json' } };
		let response;

		await axios.put(url, body, headers)
			.then(value => response = value)
			.catch(error => response = error.response);

		return response;
	}
}

module.exports = HikeRecordAPICall;