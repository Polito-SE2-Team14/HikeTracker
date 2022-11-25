'use strict';

const chai = require('chai');
const assert = chai.assert;

const HikeAPICall = require('./APICalls/hikeAPICalls');
const hikeAPICall = new HikeAPICall();

// = require("../database/dbManager");

const Singleton = require("../database/DBManagerSingleton")
const DBManager = require("../database/DBManager");
/** @type {DBManager} */
const dbManager = Singleton.getTestInstance();

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
	describe("test on getting", () => {
		it('Get all hikes', async () => {
			let expectedArray = [
				{
					hikeID: 1, title: "hike#1", length: 7, expectedTime: 30, ascent: 100,
					difficulty: "Tourist", description: "firstDescription", startPointID: 1,
					endPointID: 4, municipality: "Collegno", province: "Turin"
				},
				{
					hikeID: 2, title: "hike#2", length: 2, expectedTime: 45, ascent: 123,
					difficulty: "Hiker", description: "secondDescription", startPointID: 2,
					endPointID: 5, municipality: "Collegno", province: "Turin"
				},
				{
					hikeID: 3, title: "hike#3", length: 3, expectedTime: 60, ascent: 514,
					difficulty: "Professional Hiker", description: "thirdDescription", startPointID: 3,
					endPointID: 6, municipality: "Collegno", province: "Turin"
				},

			];
			const response = await hikeAPICall.getHikesCall();
			assert.equal(response.status, 200, response.status);
			let actualArray = await response.data;

			assert.deepEqual(actualArray, expectedArray, `Expected ${expectedArray} but got ${actualArray}`);
		})
	})

	describe("test on inserting", () => {
		it('Insert new hike', async () => {
			const hikeToInsert =
			//new Hike(4, "hike#4", 10, 11, 12, "Hiker", "Test description", 3, 4);
			{
				hikeID: 4, title: "hike#4", length: 10, expectedTime: 11, ascent: 12,
				difficulty: "Hiker", description: "test description", startPointID: 3,
				endPointID: 4, municipality: "Collegno", province: "Turin"
			}
			const response = await hikeAPICall.addHikeCall(hikeToInsert);
			assert.equal(response.status, 201, response.status);

			const response2 = await hikeAPICall.getHikesCall();
			assert.equal(response2.status, 200, response2.status);
			let actualArray = await response2.data;
			//console.log(actualArray);
			/* // The response is returned as a vector of objects, so we need to convert them to Hikes
			actualArray = actualArray.map((h) => new Hike(h.hikeID, h.title, h.length, h.expectedTime, h.ascent, h.difficulty, h.description, h.startPointID, h.endPointID));*/

			let insertedHike = await response.data;
			//insertedHike = new Hike(insertedHike.hikeID, insertedHike.title, insertedHike.length, insertedHike.expectedTime, insertedHike.ascent, insertedHike.difficulty, insertedHike.description, insertedHike.startPointID, insertedHike.endPointID);
			//console.log(insertedHike);
			assert.deepEqual(insertedHike, hikeToInsert, `Expected ${hikeToInsert}, but ${insertedHike} was inserted`);

		})
	})

	describe("test on updating", () => {

		it('Update hike 1', async () => {
			const hikeToUpdate =
			//new Hike(1, "hike#1_modified", 8, 31, 101, "Hiker", "firstDescription_modified", 2, 5);
			{
				hikeID: 1, title: "hike#1_modified", length: 8, expectedTime: 31, ascent: 101,
				difficulty: "Hiker", description: "firstDescription_modified", startPointID: 2,
				endPointID: 5, municipality: "Collegno", province: "Turin"
			}
			const response = await hikeAPICall.updateHikeCall(hikeToUpdate);
			assert.equal(response.status, 201, response.status);
			let updatedHike = await response.data;
			//updatedHike = new Hike(updatedHike.hikeID, updatedHike.title, updatedHike.length, updatedHike.expectedTime, updatedHike.ascent, updatedHike.difficulty, updatedHike.description, updatedHike.startPointID, updatedHike.endPointID);
			assert.deepEqual(updatedHike, hikeToUpdate, `Expected ${hikeToUpdate}, but ${updatedHike} was updated`);
		})
	})

});