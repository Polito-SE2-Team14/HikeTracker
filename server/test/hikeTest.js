'use strict';

const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should();
const axios = require('axios');

const hikeAPICall = require('./APICalls/hikeAPICalls');


const baseURL = "http://localhost:3001";

const dbmanager = new DBManager()
const genericAPICall = new GenericAPICall();


describe('Hikes test suite', async () => {
	beforeEach(async () => {
		await dbmanager.restoreOriginalData();
	})
	after(async () => {
		await dbmanager.restoreOriginalData();
	})

	describe('Get all hikes', async () => {
		it('a single test', async () => {
			const response = await hikeAPICall.getHikes()
			assert.equal(response.status, 200, response.status);
		})
	})

});

describe('generic test suite', async () => {

	beforeEach(async () => {
		await dbmanager.deleteAllData();
	})
	after(async () => {
		await dbmanager.deleteAllData();
	})

  
	describe('things that work', async () => {
		it('a single test', async () => {
			const response = await hikeAPICall.getHike()
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