'use strict';

const chai = require('chai');
const assert = chai.assert;

const HikeAPICall = require('./APICalls/hikeAPICalls');
const hikeAPICall = new HikeAPICall();

// = require("../database/dbManager");

const Singleton = require("../database/DBManagerSingleton")
const DBManager = require("../database/DBManager");
/** @type {DBManager} */
const dbManager = Singleton.getInstance();

const Hike = require("../Class/Hike");

describe('Hikes test suite', async () => {
	beforeEach(async () => {
		await dbManager.deleteAllHikes();
		await dbManager.restoreOriginalHikes();
	})
	after(async () => {
		await dbManager.deleteAllHikes();
		await dbManager.restoreOriginalHikes();
	})

	it('Get all hikes', async () => {
		let expectedArray=[new Hike(1, "hike#1", 7, 30, 100, "Tourist", 1, 4, "firstDescription"),
		new Hike(2, "hike#2", 2, 45, 123, "Hiker", 2, 5, "secondDescription"),
		new Hike(3, "hike#3", 3, 60, 514, "Professional Hiker", 3, 6, "thirdDescription")];
		const response = await hikeAPICall.getHikesCall();
		assert.equal(response.status, 200, response.status);
		let actualArray = await response.data;
		// The response is returned as a vector of objects, so we need to convert them to Hikes
		actualArray=actualArray.map((h)=>new Hike(h.hikeID,h.title,h.lenght,h.expectedTime,h.ascent,h.difficulty,h.description,h.startPointID,h.endPointID));
		assert.deepEqual(actualArray, expectedArray,`Expected ${expectedArray} but got ${actualArray}`);
	})

	it('Insert new hike',async () => {
		const hikeToInsert=new Hike(5,"hike#5",10,11,12,"Hiker","Test description");
		const response = await hikeAPICall.addHikeCall(hikeToInsert);
		assert.equal(response.status, 201, response.status);
		let insertedHike= await response.data;
		insertedHike = new Hike(insertedHike.hikeID,insertedHike.title,insertedHike.lenght,insertedHike.expectedTime,insertedHike.ascent,insertedHike.difficulty,insertedHike.description,insertedHike.startPointID,insertedHike.endPointID);
		assert.deepEqual(insertedHike,hikeToInsert,`Expected ${hikeToInsert}, but ${insertedHike} was inserted`);

	})

	it('Update hike 1',async () => {
		const hikeToUpdate=new Hike(1, "hike#1_modified", 8, 31, 101, "Hiker", 2, 5, "firstDescription_modified");
		const response = await hikeAPICall.addHikeCall(hikeToUpdate);
		assert.equal(response.status, 201, response.status);
		let updatedHike= await response.data;
		updatedHike = new Hike(updatedHike.hikeID,updatedHike.title,updatedHike.lenght,updatedHike.expectedTime,updatedHike.ascent,updatedHike.difficulty,updatedHike.description,updatedHike.startPointID,updatedHike.endPointID);
		assert.deepEqual(updatedHike,hikeToUpdate,`Expected ${hikeToUpdate}, but ${updatedHike} was updated`);
	})

});