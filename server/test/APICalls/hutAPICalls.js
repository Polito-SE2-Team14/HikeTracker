'use strict'

const axios = require('axios');

class HutAPICall {
    #baseURL;

    constructor() {
        this.#baseURL = "http://localhost:3001";
    }

    //GET
    async getHutsCall() {
        const url = this.#baseURL + "/api/huts";
        let response;

        await axios.get(url, { responseType: "json" })
            .then(value => response = value)
            .catch(error => response = error.response);

        return response;
    }

    //POST
    async addHutCall(newHut) {
        const url = this.#baseURL + "/api/points/huts";

        const headers = { headers: { 'Content-Type': 'application/json' } };
        let response;

        await axios.post(url, newHut, headers)
            .then(value => response = value)
            .catch(error => response = error.response);

        return response;
    }

    //DELETE
    async deleteHutCall(hutID) {
        const url = this.#baseURL + '/api/huts/' + hutID;
        let response;

        await axios.delete(url)
            .then(value => response = value)
            .catch(error => response = error.response);

        return response;
    }
}

module.exports = HutAPICall
