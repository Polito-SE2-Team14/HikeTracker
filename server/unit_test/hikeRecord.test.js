const hikeController = require("../Controller/HikeController")
const hikeRecordsController = require("../Controller/HikeRecordsController")
const hikeRecordsDAO = require("../DAO/hikeRecordsDAO")
const userController = require("../Controller/UserController")
const dayjs = require("dayjs")
const path = require('path');
const { writeFile } = require('fs');
const crypto = require("crypto");
const { user } = require("../Config/nodemailer.config");
const dbManager = require("../database/DBManagerSingleton").getInstance()
const db = dbManager.getDB();

describe("HikeRecords test suite", () => {
	beforeEach(async () => await dbManager.clearDb());
	afterAll(async () => await dbManager.clearDb());


	describe("Start an hike", () => {
		test("successful start of an hike and get", async () => {
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

			let hike = {
				title: "title", length: 10, expectedTime: 10, ascent: 10,
				difficulty: "Hiker", description: "Description", country: "Italy",
				municipality: "Torino", province: "Torino", track: [[10, 10], [11, 11]], creatorID: creatorUser.userID
			}
			await hikeController.addHike(hike)

			let startDate = dayjs().format()
			let toBeInsertedRecord = {
				userID: user.userID,
				hikeID: 1,
				startDate: startDate,
			}

			await hikeRecordsController.addNewRecord(toBeInsertedRecord)

			const record = await hikeRecordsController.getRecordByStatusOpen(user.userID);

			expect(record.userID).toBe(toBeInsertedRecord.userID)
			expect(record.hikeID).toBe(toBeInsertedRecord.hikeID)
			expect(record.status).toBe("open")
			expect(dayjs(record.startDate).format()).toBe(toBeInsertedRecord.startDate)
			expect(record.endDate).toBe(null)



		})
		test("invalid userID", async () => {
			let toBeInsertedRecord = {
				userID: "invalid",
				hikeID: 1,
				startDate: dayjs().format(),
			}

			let newErr;
			await hikeRecordsController.addNewRecord(toBeInsertedRecord)
				.catch(err => newErr = err);

			expect(newErr).not.toBeUndefined()

		})
		test("invalid hikeID", async () => {
			let toBeInsertedRecord = {
				userID: 1,
				hikeID: "invalid",
				startDate: dayjs().format(),
			}

			let newErr;
			await hikeRecordsController.addNewRecord(toBeInsertedRecord)
				.catch(err => newErr = err);

			expect(newErr).not.toBeUndefined()
		})
		test("invalid startDate", async () => {
			let toBeInsertedRecord = {
				userID: 1,
				hikeID: 1,
				startDate: "invalid",
			}
			let newErr;
			await hikeRecordsController.addNewRecord(toBeInsertedRecord)
				.catch(err => newErr = err);

			expect(newErr).not.toBeUndefined()
		})
		test("Two open hikes for the same user", async () => {
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

			let caughtError;
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
			await hikeController.addHike(hike1);
			await hikeController.addHike(hike2);

			let startDate = dayjs().format()
			let toBeInsertedRecord1 = {
				userID: user.userID,
				hikeID: 1,
				startDate: startDate,
			}
			await hikeRecordsController.addNewRecord(toBeInsertedRecord1)
			let toBeInsertedRecord2 = {
				userID: user.userID,
				hikeID: 1,
				startDate: startDate,
			}

			await hikeRecordsController.addNewRecord(toBeInsertedRecord2)
				.catch(err=>caughtError=err);
			expect(caughtError).not.toBe(null)
			expect(caughtError).not.toBe(undefined)

		})
	})

	describe("Terminate an hike", () => {
		/* test("Succesful end of an hike an get", async () => {
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

			let hike = {
				title: "title", length: 10, expectedTime: 10, ascent: 10,
				difficulty: "Hiker", description: "Description", country: "Italy",
				municipality: "Torino", province: "Torino", track: [[10, 10], [11, 11]], creatorID: creatorUser.userID
			}
			await hikeController.addHike(hike)

			let startDate = dayjs('2018-04-13 19:18').format()
			let endDate = dayjs('2018-04-14 19:18').format()

			let toBeInsertedRecord = {
				userID: user.userID,
				hikeID: 1,
				startDate: startDate,
			}

			await hikeRecordsController.addNewRecord(toBeInsertedRecord)
			await hikeRecordsController.editRecord(
				{
					userID: user.userID,
					hikeID: 1,
					startDate: startDate,
					endDate: endDate
				}
			)

			const records = await hikeRecordsDAO.getRecords(user.userID)
			expect(records[0].userID).toBe(user.userID)
			expect(records[0].hikeID).toBe(1)
			expect(records[0].startDate).toBe(startDate)
			expect(records[0].endDate).toBe(endDate)
			expect(records[0].status).toBe("completed")

		}) */

	})

	describe("Get all records for a user", ()=>{
		test("Correct userID", async()=>{
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

			const records = await hikeRecordsDAO.getRecords(user.userID)
			expect(records[0].userID).toBe(user.userID)
			expect(records[0].hikeID).toBe(1)
			expect(records[0].startDate).toBe(startDate1)
			expect(records[0].endDate).toBe(endDate1)
			expect(records[0].status).toBe("completed")
			expect(records[1].userID).toBe(user.userID)
			expect(records[1].hikeID).toBe(2)
			expect(records[1].startDate).toBe(startDate2)
			expect(records[1].endDate).toBe(endDate2)
			expect(records[1].status).toBe("completed")
			expect(records[2].userID).toBe(user.userID)
			expect(records[2].hikeID).toBe(3)
			expect(records[2].startDate).toBe(startDate3)
			expect(records[2].endDate).toBe(endDate3)
			expect(records[2].status).toBe("completed")
		})

		test("Incorrect userID", async()=>{
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
			let endDate1 = dayjs('2018-04-14 19:18').format()
			
			let toBeInsertedRecord1 = {
				userID: user.userID,
				hikeID: 1,
				startDate: startDate1,
			}
			
			await hikeRecordsController.addNewRecord(toBeInsertedRecord1)
			await hikeRecordsController.editRecord(
				{
					userID: user.userID,
					hikeID: 1,
					startDate: startDate1,
					endDate: endDate1
				}
			)
			
			await hikeRecordsController.getRecords("SomeString")
				.catch(err=>caughtError=err);
			expect(caughtError).not.toBe(undefined)
			expect(caughtError).not.toBe(null)
		})
	})

	describe("Get open record for a user", ()=>{
		test("Correct userID", async()=>{
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
			await hikeController.addHike(hike1)
			await hikeController.addHike(hike2)

			let startDate1 = dayjs('2018-04-13 19:18').format()
			let toBeInsertedRecord1 = {
				userID: user.userID,
				hikeID: 1,
				startDate: startDate1,
			}
			await hikeRecordsController.addNewRecord(toBeInsertedRecord1)
			let endDate1 = dayjs('2018-04-14 19:18').format()
			await hikeRecordsController.editRecord(
				{
					userID: user.userID,
					hikeID: 1,
					startDate: startDate1,
					endDate: endDate1
				}
			)

			let startDate2 = dayjs('2018-05-15 19:18').format()
			let toBeInsertedRecord2 = {
				userID: user.userID,
				hikeID: 2,
				startDate: startDate2,
			}
			await hikeRecordsController.addNewRecord(toBeInsertedRecord2)

			
			const record = await hikeRecordsController.getRecordByStatusOpen(user.userID);
			expect(record.userID).toBe(user.userID)
			expect(record.hikeID).toBe(2)
			expect(record.startDate).toBe(startDate2)
			expect(record.endDate).toBe(null)
			expect(record.status).toBe("open")
		})

		test("Incorrect userID", async()=>{
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
			
			await hikeRecordsController.getRecordByStatusOpen("SomeString")
				.catch(err=>caughtError=err);
			expect(caughtError).not.toBe(undefined)
			expect(caughtError).not.toBe(null)
		})
	})

})