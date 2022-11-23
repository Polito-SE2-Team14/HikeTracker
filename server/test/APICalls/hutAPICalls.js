'use strict'

const axios = require('axios');

class HutAPICall {
    #baseURL;

    constructor() {
        this.#baseURL = "http://localhost:3001";
    }

    //POST
    async addHutCall(newHut) {
        const url = this.#baseURL + "/api/points/huts";

        const body = newHut
        const headers = { headers: { 'Content-Type': 'application/json' } };
        let response;

        await axios.post(url, body, headers)
            .then(value => response = value)
            .catch(error => response = error.response);

        return response;
    }
}

module.exports = HutAPICall
