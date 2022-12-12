'use strict'

const axios = require('axios');

class HikeAPICall {
	#baseURL;

	constructor() {
		this.#baseURL = "http://localhost:3001";
	}

	//GET
	async getHikesCall() {
		const url = this.#baseURL + "/api/hikes";
		let response;

		await axios.get(url, { responseType: "json" })
			.then(value => response = value)
			.catch(error => response = error.response);

		return response;
	}

	async getHikeCall(hikeID) {
		const url = this.#baseURL + "/api/hikes/" + hikeID;
		let response;

		await axios.get(url, { responseType: "json" })
			.then(value => response = value)
			.catch(error => response = error.response);

		return response;
	}

	async getHikeTrackCall(hikeID) {
		const url = this.#baseURL + "/api/hikes/" + hikeID + '/track';
		let response;

		await axios.get(url, { responseType: "json" })
			.then(value => response = value)
			.catch(error => response = error.response);

		return response;
	}

	async getCloseHutsCall(hikeID) {
		const url = this.#baseURL + "/api/hikes/" + hikeID + '/huts';
		let response;

		await axios.get(url, { responseType: "json" })
			.then(value => response = value)
			.catch(error => response = error.response);

		return response;
	}

	async getReferencePointsCall(hikeID) {
		const url = this.#baseURL + "/api/hikes/" + hikeID + '/referencePoints';
		let response;

		await axios.get(url, { responseType: "json" })
			.then(value => response = value)
			.catch(error => response = error.response);

		return response;
	}

	async getLinkedHutsCall(hikeID) {
		const url = this.#baseURL + "/api/hikes/" + hikeID + '/linkedHuts';
		let response;

		await axios.get(url, { responseType: "json" })
			.then(value => response = value)
			.catch(error => response = error.response);

		return response;
	}

	//POST
	async linkHutCall(hikeID, hutID) {
		const url = this.#baseURL + "/api/hikes/" + hikeID + '/huts/' + hutID;
		
		let response;

		await axios.post(url, { responseType: "json" })
			.then(value => response = value)
			.catch(error => response = error.response);

		return response;
	}

	async addHikeCall(newHike) {
		const url = this.#baseURL + "/api/hikes";

		const headers = { headers: { 'Content-Type': 'application/json' } };
		let response;

		await axios.post(url, newHike, headers)
			.then(value => response = value)
			.catch(error => response = error.response);

		return response;
	}

	async addReferencePointCall(hikeID, referencePoint) {
		const url = this.#baseURL + "/api/hikes/referencePoints";

		const body = {
			hikeID: hikeID,
			referencePoint: {...referencePoint}
		};

		const headers = { headers: { 'Content-Type': 'application/json' } };
		let response;

		await axios.post(url, body, headers)
			.then(value => response = value)
			.catch(error => response = error.response);

		return response;
	}

	async addStartPointCall(hikeID, startID) {
		const url = this.#baseURL + "/api/hikes/start";

		const body = {
			hikeID: hikeID,
			startPointID: startID
		};

		const headers = { headers: { 'Content-Type': 'application/json' } };
		let response;

		await axios.post(url, body, headers)
			.then(value => response = value)
			.catch(error => response = error.response);

		return response;
	}

	async addEndPointCall(hikeID, endID) {
		const url = this.#baseURL + "/api/hikes/end";

		const body = {
			hikeID: hikeID,
			endPointID: endID
		};

		const headers = { headers: { 'Content-Type': 'application/json' } };
		let response;

		await axios.post(url, body, headers)
			.then(value => response = value)
			.catch(error => response = error.response);

		return response;
	}

	//PUT
	async putMethod(param1, param2, param3) {
		const url = this.#baseURL + "/api/genericPut";
		const body = {
			param1: param1,
			param2: param2,
			param3: param3
		}
		const headers = { headers: { 'Content-Type': 'application/json' } };
		let response;

		await axios.put(url, body, headers)
			.then(value => response = value)
			.catch(error => response = error.response);

		return response;
	}

	//DELETE
	async deleteLinkToHutCall(hikeID, hutID) {
		const url = this.#baseURL + "/api/hikes/" + hikeID + '/huts/' + hutID;
		let response;

		await axios.delete(url)
			.then(value => response = value)
			.catch(error => response = error.response);

		return response;
	}

	async deleteHikeCall(hikeID, hutID) {
		const url = this.#baseURL + "/api/hikes/" + hikeID;
		let response;

		await axios.delete(url)
			.then(value => response = value)
			.catch(error => response = error.response);

		return response;
	}
}

module.exports = HikeAPICall;