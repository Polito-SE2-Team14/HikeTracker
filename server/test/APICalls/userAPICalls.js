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

    async login(username, password) {
        const url = this.#baseURL + "/api/users/login";

        const body = {
            username,
            password
        }
        const headers = { headers: { 'Content-Type': 'application/json' } };
        let response;

        await axios.post(url, body, headers)
            .then(value => response = value)
            .catch(error => response = error.response);

        return response;
    }

    //GET
    async getAllHutWorkers() {
        const url = this.#baseURL + "/api/users/hutworkers/all";
        let response;

        await axios.get(url, { responseType: "json" })
            .then(value => response = value)
            .catch(error => response = error.response);
        return response;
    }

    //GET
    async getAllLocalGuides() {
        const url = this.#baseURL + "/api/users/localguides/all";
        let response;

        await axios.get(url, { responseType: "json" })
            .then(value => response = value)
            .catch(error => response = error.response);
        return response;
    }

    //PUT
    async approveUser(userID) {
        const url = this.#baseURL + "/api/users/approve/" + userID;
        const headers = { headers: { 'Content-Type': 'application/json' } };
        let response;

        await axios.put(url, [], headers)
            .then(value => response = value)
            .catch(error => response = error.response);

        return response;
    }

    async unApproveUser(userID) {
        const url = this.#baseURL + "/api/users/unapprove/" + userID;
        const headers = { headers: { 'Content-Type': 'application/json' } };
        let response;

        await axios.put(url, [], headers)
            .then(value => response = value)
            .catch(error => response = error.response);

        return response;
    }
}

module.exports = UserAPICall
