'use strict'

const axios = require('axios');

class UserAPICall {
    #baseURL;

    constructor() {
        this.#baseURL = "http://localhost:3001";
    }

    //POST
    async addNewUser(user) {
        const url = this.#baseURL + "/api/users";

        const body = user
        const headers = { headers: { 'Content-Type': 'application/json' } };
        let response;

        await axios.post(url, body, headers)
            .then(value => response = value)
            .catch(error => response = error.response);

        return response;
    }
}

module.exports = UserAPICall
