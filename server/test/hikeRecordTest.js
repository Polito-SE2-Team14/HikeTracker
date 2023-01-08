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
const { FONT_SANS_10_BLACK } = require('jimp/types');
SingletonTest.getInstance()

before('starting hike records tests', async () => await dbManager.clearDb());

afterEach('clearing DB', async () => await dbManager.clearDb());

describe('Hike records test suite', () =>{
	describe('Get completed hikes', () => {
		it('correct userID', async () => {
			await hikeRecordAPICall.addRecord(1,1,)
			// const response = await hikeRecordAPICall.
		})
	})
})