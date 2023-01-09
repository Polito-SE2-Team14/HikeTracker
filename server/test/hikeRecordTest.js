'use strict';

const chai = require('chai');
const assert = chai.assert;

const HikeRecordAPICall = require('./APICalls/hikeRecordAPICalls');
const hikeRecordAPICall = new HikeRecordAPICall();

const Singleton = require("../database/DBManagerSingleton");
const DBManager = require("../database/DBManager");
/** @type {DBManager} */
const dbManager = Singleton.getInstance();

const SingletonTest = require("./SingletonTest");
const dayjs = require('dayjs');
SingletonTest.getInstance();

describe('Hike records test suite', () => {
	beforeEach('adding users for hike records', async () => await dbManager.addUsers());

	describe('Get hike records', () => {
		it('GET /hikeRecords/:userID valid userID empty', async () => {
			const response = await hikeRecordAPICall.getRecords(3);
			const data = await response.data;

			assert.equal(response.status, 200, response.status);
			assert.deepEqual(data, []);
		});

		it('GET /hikeRecords/:userID correct userID not empty', async () => {
			await dbManager.addHikes();
			let expectedData = await dbManager.addHikeRecords();

			const response = await hikeRecordAPICall.getRecords(3);
			const data = await response.data;

			assert.equal(response.status, 200, response.status);
			assert.deepEqual(data, expectedData);
		});

		it('GET /hikeRecords/:userID invalid userID NaN', async () => {
			const response = await hikeRecordAPICall.getRecords("invalid");

			assert.equal(response.status, 422, response.status);
		});
	});

	describe('Get open record for a user', () => {
		it('GET /hikeRecords/:userID/status/open valid userID empty', async () => {
			const response = await hikeRecordAPICall.getOpenRecord(3);
			
			assert.equal(response.status, 404, response.status);
		});

		it('GET /hikeRecords/:userID/status/open valid userID not empty', async () => {
			await dbManager.addHikes();
			let expectedData = await dbManager.addHikeRecords();

			const response = await hikeRecordAPICall.getOpenRecord(3);
			const data = await response.data;

			assert.equal(response.status, 200, response.status);
			assert.deepEqual(data, expectedData[0]);
		});
		
		it('GET /hikeRecords/:userID/status/open invalid userID', async () => {
			const response = await hikeRecordAPICall.getOpenRecord("invalid");

			assert.equal(response.status, 422, response.status);
		});
	});

	describe('Start hike', () => {
		it('POST /hikerecords', async() => {
			const record = {
				userID: 3,
				hikeID: 1,
				startDate: dayjs(Date.now()).format()
			};

			const response = await hikeRecordAPICall.addRecord(record);

			assert.equal(response.status, 201, response.status);
		});

		it('POST /hikerecords user has open hike', async () => {
			await dbManager.addHikes();
			await dbManager.addHikeRecords();

			const record = {
				userID: 3,
				hikeID: 1,
				startDate: dayjs(Date.now()).format()
			};

			const response = await hikeRecordAPICall.addRecord(record);

			assert.equal(response.status, 500, response.status);
		});

		it('POST /hikerecords wrong userID', async () => {
			const record = {
				userID: 'invalid',
				hikeID: 1,
				startDate: dayjs(Date.now()).format()
			};

			const response = await hikeRecordAPICall.addRecord(record);

			assert.equal(response.status, 422, response.status);
		});

		it('POST /hikerecords wrong hikeID', async () => {
			const record = {
				userID: 3,
				hikeID: 'invalid',
				startDate: dayjs(Date.now()).format()
			};

			const response = await hikeRecordAPICall.addRecord(record);

			assert.equal(response.status, 422, response.status);
		});

		it('POST /hikerecords wrong startDate', async () => {
			const record = {
				userID: 3,
				hikeID: 1,
				startDate: 'invalid'
			};

			const response = await hikeRecordAPICall.addRecord(record);

			assert.equal(response.status, 500, response.status);
		});

		it('POST /hikerecords missing userID', async () => {
			const record = {
				hikeID: 1,
				startDate: dayjs(Date.now()).format()
			};

			const response = await hikeRecordAPICall.addRecord(record);

			assert.equal(response.status, 422, response.status);
		});

		it('POST /hikerecords missing hikeID', async () => {
			const record = {
				userID: 3,
				startDate: dayjs(Date.now()).format()
			};

			const response = await hikeRecordAPICall.addRecord(record);

			assert.equal(response.status, 422, response.status);
		});

		it('POST /hikerecords missing startDate', async () => {
			const record = {
				userID: 3,
				hikeID: 1
			};

			const response = await hikeRecordAPICall.addRecord(record);

			assert.equal(response.status, 422, response.status);
		});
	});

	describe('End hike', () => {
		it('PUT /hikerecords', async () => {
			await dbManager.addHikes();
			await dbManager.addHikeRecords();

			const record = {
				userID: 3,
				hikeID: 1,
				startDate: dayjs('2018-05-13 19:18').format(),
				endDate: dayjs(Date.now()).format()
			};

			const response = await hikeRecordAPICall.editRecord(record);

			assert.equal(response.status, 204, response.status);
		});

		it('PUT /hikerecords wrong userID', async () => {
			const record = {
				userID: 'invalid',
				hikeID: 1,
				startDate: dayjs('2018-05-13 19:18').format(),
				endDate: dayjs(Date.now()).format()
			};

			const response = await hikeRecordAPICall.editRecord(record);

			assert.equal(response.status, 422, response.status);
		});

		it('PUT /hikerecords wrong hikeID', async () => {
			const record = {
				userID: 3,
				hikeID: 'invalid',
				startDate: dayjs('2018-05-13 19:18').format(),
				endDate: dayjs(Date.now()).format()
			};

			const response = await hikeRecordAPICall.editRecord(record);

			assert.equal(response.status, 422, response.status);
		});

		it('PUT /hikerecords wrong startDate', async () => {
			const record = {
				userID: 3,
				hikeID: 1,
				startDate: 'invalid',
				endDate: dayjs(Date.now()).format()
			};

			const response = await hikeRecordAPICall.editRecord(record);

			assert.equal(response.status, 500, response.status);
		});

		it('PUT /hikerecords missing userID', async () => {
			const record = {
				hikeID: 1,
				startDate: dayjs('2018-05-13 19:18').format(),
				endDate: dayjs(Date.now()).format()
			};

			const response = await hikeRecordAPICall.editRecord(record);

			assert.equal(response.status, 422, response.status);
		});

		it('PUT /hikerecords missing hikeID', async () => {
			const record = {
				userID: 3,
				startDate: dayjs('2018-05-13 19:18').format(),
				endDate: dayjs(Date.now()).format()
			};

			const response = await hikeRecordAPICall.editRecord(record);

			assert.equal(response.status, 422, response.status);
		});

		it('PUT /hikerecords missing startDate', async () => {
			const record = {
				userID: 3,
				hikeID: 1,
				endDate: dayjs(Date.now()).format()
			};

			const response = await hikeRecordAPICall.editRecord(record);

			assert.equal(response.status, 422, response.status);
		});
	});
});