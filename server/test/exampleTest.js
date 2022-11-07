'use strict';

const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should();
const axios = require('axios');

const GenericAPICall = require('./APICalls/GenericCalls');


const baseURL = "http://localhost:3001";

const dbmanager = new DBManager()
const genericAPICall = new GenericAPICall();


describe('generic test suite', async () => {

    beforeEach(async () => {
        await dbmanager.deleteAllData();
    })
    after(async () => {
        await dbmanager.deleteAllData();
    })

  
    describe('things that work', async () => {
        it('a single test', async () => {
            const response = await genericAPICall.genericMethod();
            assert.equal(response.status, 200, response.status);
        })
    })

    describe('things that dont work', async () => {

        it('a single test', async () => {
            const response = await genericAPICall.genericMethod();
            assert.equal(response.status, 500, response.status);
        })

    })

});