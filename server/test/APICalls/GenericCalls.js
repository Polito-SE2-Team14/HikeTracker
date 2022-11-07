'use strict'

const axios = require('axios');

class GenericAPICall {
    #baseURL;

    constructor() {
        this.#baseURL = "http://localhost:3001";
    }

    //GET
    async getMethod() {
        const url = this.#baseURL + "/api/genericGet";
        let response;

        await axios.get(url)
            .then(value => response = value)
            .catch(error => response = error.response);

        return response;
    }


    //POST
    async postMethod(param1, param2, param3) {
        const url = this.#baseURL + "/api/genericPost";
        const body = {
            param1: param1,
            param2: param2,
            param3: param3
        }
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
    async deleteMethod(param) {
        const url = this.#baseURL + "/api/genericDelete/" + param;
        let response;

        await axios.delete(url)
            .then(value => response = value)
            .catch(error => response = error.response);

        return response;
    }

}

module.exports = GenericAPICall;