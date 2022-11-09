'use strict';

const chai = require('chai');
const assert = chai.assert;

const hikeAPICall = require('./APICalls/hikeAPICalls');

const dbmanager = new DBManager()
const Hike = require("../Class/Hike");

describe('Hikes test suite', async () => {
	beforeEach(async () => {
		await dbmanager.restoreOriginalHikes();
	})
	after(async () => {
		await dbmanager.restoreOriginalHikes();
	})

	it('Get all hikes', async () => {
		const expectedArray=[new Hike(1, "hike#1", 7, 30, 100, "Tourist", 1, 4, "firstDescription"),
		new Hike(2, "hike#2", 2, 45, 123, "Hiker", 2, 5, "secondDescription"),
		new Hike(3, "hike#3", 3, 60, 514, "Professional Hiker", 3, 6, "thirdDescription")];
		const response = await hikeAPICall.getHikesCall();
		assert.equal(response.status, 200, response.status);
		const actualArray = await response.json();
		assert.equal(actualArray, expectedArray,`Expected ${expectedArray} but got ${actualArray}`);
	})

	it('Insert new hike',async () => {
		const hikeToInsert=new Hike(5,"hike#5",10,11,12,"Hiker","Test description");
		const response = await hikeAPICall.addHikeCall(hikeToInsert);
		assert.equal(response.status, 200, response.status);
		const insertedHike= await response.json();
		assert.equal(insertedHike,hikeToInsert,`Expected ${hikeToInsert}, but ${insertedHike} was inserted`);

	})

	it('Update hike 1',async () => {
		const hikeToUpdate=new Hike(1, "hike#1_modified", 8, 31, 101, "Hiker", 2, 5, "firstDescription_modified");
		const response = await hikeAPICall.addHikeCall(hikeToInsert);
		assert.equal(response.status, 200, response.status);
		const updatedHike= await response.json();
		assert.equal(updatedHike,hikeToUpdate,`Expected ${hikeToUpdate}, but ${updatedHike} was updated`);
	})

});