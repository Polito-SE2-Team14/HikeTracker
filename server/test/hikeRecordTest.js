'use strict';

const chai = require('chai');
const assert = chai.assert;

const HikeRecordAPICall = require('./APICalls/hikeRecordAPICalls');
const hikeRecordAPICall = new HikeRecordAPICall();

const hikeController = require("../Controller/HikeController")
const hikeRecordsController = require("../Controller/HikeRecordsController")
const userController = require("../Controller/UserController")

const Singleton = require("../database/DBManagerSingleton");
const DBManager = require("../database/DBManager");
/** @type {DBManager} */
const dbManager = Singleton.getInstance();

const SingletonTest = require("./SingletonTest");
const dayjs = require('dayjs');
const crypto = require("crypto");
SingletonTest.getInstance()

before('starting hike records tests', async () => await dbManager.clearDb());


afterEach('clearing DB', async () => await dbManager.clearDb());

describe('Hike records test suite', () =>{
	describe('Get hike records', () => {
		it('Correct userID', async () => {
			let creatorUser, user
			await userController.register({
				name: 'matteo', surname: 'marroni', email: 'matteo.marroni@ex.com', phoneNumber: '2222222222',
				type: "localGuide", password: crypto.randomBytes(16).toString("hex")
			}, 1, 1)
				.then(u => {
					creatorUser = u;
				})
				.catch(err => { console.error(err); throw err; });

			await userController.register({
				name: 'marco', surname: 'verdi', email: 'marco.verdi@ex.com', phoneNumber: '1111111111',
				type: "hiker", password: crypto.randomBytes(16).toString("hex")
			}, 1, 1)
				.then(u => {
					user = u;
				})
				.catch(err => { console.error(err); throw err; });

			let hike1 = {
				title: "title1", length: 10, expectedTime: 10, ascent: 10,
				difficulty: "Hiker", description: "Description", country: "Italy",
				municipality: "Torino", province: "Torino", track: [[10, 10], [11, 11]], creatorID: creatorUser.userID
			}
			let hike2 = {
				title: "title2", length: 20, expectedTime: 20, ascent: 20,
				difficulty: "Hiker", description: "Description", country: "Italy",
				municipality: "Torino", province: "Torino", track: [[20, 20], [22, 22]], creatorID: creatorUser.userID
			}
			let hike3 = {
				title: "title3", length: 30, expectedTime: 30, ascent: 30,
				difficulty: "Hiker", description: "Description", country: "Italy",
				municipality: "Torino", province: "Torino", track: [[30, 30], [33, 33]], creatorID: creatorUser.userID
			}
			await hikeController.addHike(hike1)
			await hikeController.addHike(hike2)
			await hikeController.addHike(hike3)
			let startDate1 = dayjs('2018-04-13 19:18').format()
			let toBeInsertedRecord1 = {
				userID: user.userID,
				hikeID: 1,
				startDate: startDate1,
			}
			let endDate1 = dayjs('2018-04-14 19:18').format()
			await hikeRecordsController.addNewRecord(toBeInsertedRecord1)
			await hikeRecordsController.editRecord(
				{
					userID: user.userID,
					hikeID: 1,
					startDate: startDate1,
					endDate: endDate1
				}
			)

			let startDate2 = dayjs('2018-05-15 19:18').format()
			let endDate2 = dayjs('2018-05-16 19:18').format()
			let toBeInsertedRecord2 = {
				userID: user.userID,
				hikeID: 2,
				startDate: startDate2,
			}
			await hikeRecordsController.addNewRecord(toBeInsertedRecord2)
			await hikeRecordsController.editRecord(
				{
					userID: user.userID,
					hikeID: 2,
					startDate: startDate2,
					endDate: endDate2
				}
			)

			let startDate3 = dayjs('2018-06-16 19:18').format()
			let toBeInsertedRecord3 = {
				userID: user.userID,
				hikeID: 3,
				startDate: startDate3,
			}
			await hikeRecordsController.addNewRecord(toBeInsertedRecord3)
			let endDate3 = dayjs('2018-06-17 19:18').format()
			await hikeRecordsController.editRecord(
				{
					userID: user.userID,
					hikeID: 3,
					startDate: startDate3,
					endDate: endDate3
				}
			)
		
			const records=await hikeRecordAPICall.getRecords(user.userID);
			console.log(records.data);
			assert.equal(records.data[0].userID,user.userID,"Error");
			assert.equal(records.data[0].hikeID,1,"Error");
			assert.equal(records.data[0].startDate,startDate1,"Error");
			assert.equal(records.data[0].endDate,endDate1,"Error");
			assert.equal(records.data[0].status,"completed","Error");
			assert.equal(records.data[1].userID,user.userID,"Error");
			assert.equal(records.data[1].hikeID,2,"Error");
			assert.equal(records.data[1].startDate,startDate2,"Error");
			assert.equal(records.data[1].endDate,endDate2,"Error");
			assert.equal(records.data[1].status,"completed","Error");
			assert.equal(records.data[2].userID,user.userID,"Error");
			assert.equal(records.data[2].hikeID,3,"Error");
			assert.equal(records.data[2].startDate,startDate3,"Error");
			assert.equal(records.data[2].endDate,endDate3,"Error");
			assert.equal(records.data[2].status,"completed","Error");
		});
		it('Incorrect userID', async () => {
			let creatorUser, user, caughtError;
			await userController.register({
				name: 'matteo', surname: 'marroni', email: 'matteo.marroni@ex.com', phoneNumber: '2222222222',
				type: "localGuide", password: crypto.randomBytes(16).toString("hex")
			}, 1, 1)
				.then(u => {
					creatorUser = u;
				})
				.catch(err => { console.error(err); throw err; });

			await userController.register({
				name: 'marco', surname: 'verdi', email: 'marco.verdi@ex.com', phoneNumber: '1111111111',
				type: "hiker", password: crypto.randomBytes(16).toString("hex")
			}, 1, 1)
				.then(u => {
					user = u;
				})
				.catch(err => { console.error(err); throw err; });

			let hike1 = {
				title: "title1", length: 10, expectedTime: 10, ascent: 10,
				difficulty: "Hiker", description: "Description", country: "Italy",
				municipality: "Torino", province: "Torino", track: [[10, 10], [11, 11]], creatorID: creatorUser.userID
			}
			await hikeController.addHike(hike1)
			let startDate1 = dayjs('2018-04-13 19:18').format()
			let toBeInsertedRecord1 = {
				userID: user.userID,
				hikeID: 1,
				startDate: startDate1,
			}
			await hikeRecordsController.addNewRecord(toBeInsertedRecord1)
	
			const response=await hikeRecordAPICall.getRecords("SomeWrongID");
			assert.equal(response.status, 422, response.status);
		});
	})

	describe('Get open record for a user', () => {
		it('Correct userID', async () => {
			let creatorUser, user
			await userController.register({
				name: 'matteo', surname: 'marroni', email: 'matteo.marroni@ex.com', phoneNumber: '2222222222',
				type: "localGuide", password: crypto.randomBytes(16).toString("hex")
			}, 1, 1)
				.then(u => {
					creatorUser = u;
				})
				.catch(err => { console.error(err); throw err; });

			await userController.register({
				name: 'marco', surname: 'verdi', email: 'marco.verdi@ex.com', phoneNumber: '1111111111',
				type: "hiker", password: crypto.randomBytes(16).toString("hex")
			}, 1, 1)
				.then(u => {
					user = u;
				})
				.catch(err => { console.error(err); throw err; });

			let hike1 = {
				title: "title1", length: 10, expectedTime: 10, ascent: 10,
				difficulty: "Hiker", description: "Description", country: "Italy",
				municipality: "Torino", province: "Torino", track: [[10, 10], [11, 11]], creatorID: creatorUser.userID
			}
			let hike2 = {
				title: "title2", length: 20, expectedTime: 20, ascent: 20,
				difficulty: "Hiker", description: "Description", country: "Italy",
				municipality: "Torino", province: "Torino", track: [[20, 20], [22, 22]], creatorID: creatorUser.userID
			}
			let hike3 = {
				title: "title3", length: 30, expectedTime: 30, ascent: 30,
				difficulty: "Hiker", description: "Description", country: "Italy",
				municipality: "Torino", province: "Torino", track: [[30, 30], [33, 33]], creatorID: creatorUser.userID
			}
			await hikeController.addHike(hike1)
			await hikeController.addHike(hike2)
			await hikeController.addHike(hike3)
			let startDate1 = dayjs('2018-04-13 19:18').format()
			let toBeInsertedRecord1 = {
				userID: user.userID,
				hikeID: 1,
				startDate: startDate1,
			}
			let endDate1 = dayjs('2018-04-14 19:18').format()
			await hikeRecordsController.addNewRecord(toBeInsertedRecord1)
			await hikeRecordsController.editRecord(
				{
					userID: user.userID,
					hikeID: 1,
					startDate: startDate1,
					endDate: endDate1
				}
			)

			let startDate2 = dayjs('2018-05-15 19:18').format()
			let endDate2 = dayjs('2018-05-16 19:18').format()
			let toBeInsertedRecord2 = {
				userID: user.userID,
				hikeID: 2,
				startDate: startDate2,
			}
			await hikeRecordsController.addNewRecord(toBeInsertedRecord2)
			await hikeRecordsController.editRecord(
				{
					userID: user.userID,
					hikeID: 2,
					startDate: startDate2,
					endDate: endDate2
				}
			)

			let startDate3 = dayjs('2018-06-16 19:18').format()
			let toBeInsertedRecord3 = {
				userID: user.userID,
				hikeID: 3,
				startDate: startDate3,
			}
			await hikeRecordsController.addNewRecord(toBeInsertedRecord3)
					
			const records=await hikeRecordAPICall.getOpenRecord(user.userID);
			console.log(records.data);
			assert.equal(records.data.userID,user.userID,"Error");
			assert.equal(records.data.hikeID,3,"Error");
			assert.equal(records.data.startDate,startDate3,"Error");
			assert.equal(records.data.status,"open","Error");
		});
		it('Incorrect userID', async () => {
			let creatorUser, user, caughtError;
			await userController.register({
				name: 'matteo', surname: 'marroni', email: 'matteo.marroni@ex.com', phoneNumber: '2222222222',
				type: "localGuide", password: crypto.randomBytes(16).toString("hex")
			}, 1, 1)
				.then(u => {
					creatorUser = u;
				})
				.catch(err => { console.error(err); throw err; });

			await userController.register({
				name: 'marco', surname: 'verdi', email: 'marco.verdi@ex.com', phoneNumber: '1111111111',
				type: "hiker", password: crypto.randomBytes(16).toString("hex")
			}, 1, 1)
				.then(u => {
					user = u;
				})
				.catch(err => { console.error(err); throw err; });

			let hike1 = {
				title: "title1", length: 10, expectedTime: 10, ascent: 10,
				difficulty: "Hiker", description: "Description", country: "Italy",
				municipality: "Torino", province: "Torino", track: [[10, 10], [11, 11]], creatorID: creatorUser.userID
			}
			await hikeController.addHike(hike1)
			let startDate1 = dayjs('2018-04-13 19:18').format()
			let toBeInsertedRecord1 = {
				userID: user.userID,
				hikeID: 1,
				startDate: startDate1,
			}
			await hikeRecordsController.addNewRecord(toBeInsertedRecord1)
	
			const response=await hikeRecordAPICall.getOpenRecord("SomeWrongID");
			assert.equal(response.status, 422, response.status);
		});
	})

})