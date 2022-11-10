'use strict';

const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should();
const axios = require('axios');

const GenericAPICall = require('./APICalls/GenericCalls');


const baseURL = "http://localhost:3001";

const genericAPICall = new GenericAPICall();

const Singleton = require("../database/DBManagerSingleton")
const DBManager = require("../database/DBManager");
/** @type {DBManager} */
const dbManager = Singleton.getInstance();


describe('generic test suite', async () => {

    beforeEach(async () => {
        await dbManager.clearDb();
    })
    after(async () => {
        await dbManager.clearDb();
    })


    describe('things that work', async () => {
        it('a single test', async () => {

            /* const response = await genericAPICall.genericMethod();
            assert.equal(response.status, 200, response.status); */
        })
    })

    describe('things that dont work', async () => {

        it('a single test', async () => {
            /* const response = await genericAPICall.genericMethod();
            assert.equal(response.status, 500, response.status); */
        })

    })

});