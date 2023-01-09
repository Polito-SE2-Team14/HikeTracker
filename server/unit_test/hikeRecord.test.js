const hikeController = require("../Controller/HikeController")
const hikeRecordsController = require("../Controller/HikeRecordsController")
const hikeRecordsDAO = require("../DAO/hikeRecordsDAO")
const userController = require("../Controller/UserController")
const dayjs = require("dayjs")
const path = require('path');
const { writeFile } = require('fs');
const crypto = require("crypto");
const { user } = require("../Config/nodemailer.config");
const DBManager = require("../database/DBManager")
/**@type {DBManager} */
const dbManager = require("../database/DBManagerSingleton").getInstance()
const db = dbManager.getDB();

describe("HikeRecords test suite", () => {
	beforeAll(async () => await dbManager.clearDb());
	afterEach(async () => await dbManager.clearDb());

	beforeEach(async () => await dbManager.addUsers());

	describe("Start an hike", () => {
		test("successful start of an hike and get", async () => {
			await dbManager.addHikes();

			let startDate = dayjs().format()
			let toBeInsertedRecord = {
				userID: 3,
				hikeID: 1,
				startDate: startDate,
			}

			await hikeRecordsController.addNewRecord(toBeInsertedRecord)

			const record = await hikeRecordsController.getRecordByStatusOpen(3);

			expect(record.userID).toBe(toBeInsertedRecord.userID)
			expect(record.hikeID).toBe(toBeInsertedRecord.hikeID)
			expect(record.status).toBe("open")
			expect(dayjs(record.startDate).format()).toBe(toBeInsertedRecord.startDate)
			expect(record.endDate).toBe(null)



		})
		test("invalid userID", async () => {
			await dbManager.addHikes();

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
			await dbManager.addHikes();

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
			await dbManager.addHikes();

			let startDate = dayjs().format()
			let toBeInsertedRecord1 = {
				userID: 3,
				hikeID: 1,
				startDate: startDate,
			}
			await hikeRecordsController.addNewRecord(toBeInsertedRecord1)
			let toBeInsertedRecord2 = {
				userID: 3,
				hikeID: 2,
				startDate: startDate,
			}
			let caughtError;
			await hikeRecordsController.addNewRecord(toBeInsertedRecord2)
				.catch(err => caughtError = err);
			expect(caughtError).not.toBe(null)
			expect(caughtError).not.toBe(undefined)

		})
	})

	describe("Terminate an hike", () => {
		test("Succesful end of an hike an get", async () => {
			await dbManager.addHikes();

			let startDate = dayjs('2018-04-13 19:18').format()
			let endDate = dayjs('2018-04-14 19:18').format()

			let toBeInsertedRecord = {
				userID: 3,
				hikeID: 1,
				startDate: startDate,
			}

			await hikeRecordsController.addNewRecord(toBeInsertedRecord)
			await hikeRecordsController.editRecord(
				{
					userID: 3,
					hikeID: 1,
					startDate: startDate,
					endDate: endDate
				}
			)

			const records = await hikeRecordsDAO.getRecords(3)
			expect(records[0].userID).toBe(3)
			expect(records[0].hikeID).toBe(1)
			expect(records[0].startDate).toBe(startDate)
			expect(records[0].endDate).toBe(endDate)
			expect(records[0].status).toBe("completed")

		})

	})

	describe("Get all records for a user", () => {
		test("Correct userID", async () => {
			await dbManager.addHikes();
			await dbManager.addHikeRecords();

			const records = await hikeRecordsDAO.getRecords(3)
			expect(records[0].userID).toBe(3)
			expect(records[0].hikeID).toBe(1)
			expect(records[0].startDate).toBe(dayjs('2018-05-13 19:18').format())
			expect(records[0].endDate).toBe(null)
			expect(records[0].status).toBe("open")
			expect(records[1].userID).toBe(3)
			expect(records[1].hikeID).toBe(2)
			expect(records[1].startDate).toBe(dayjs('2018-04-13 19:18').format())
			expect(records[1].endDate).toBe(dayjs('2018-04-13 23:18').format())
			expect(records[1].status).toBe("completed")
			expect(records[2].userID).toBe(3)
			expect(records[2].hikeID).toBe(3)
			expect(records[2].startDate).toBe(dayjs('2018-03-13 19:18').format())
			expect(records[2].endDate).toBe(dayjs('2018-03-13 00:18').format())
			expect(records[2].status).toBe("completed")
		})

		test("Incorrect userID", async () => {
			let caughtError;
			await hikeRecordsController.getRecords("SomeString")
				.catch(err => caughtError = err);

			expect(caughtError).not.toBe(undefined)
			expect(caughtError).not.toBe(null)
		})
	})

	describe("Get open record for a user", () => {
		test("Correct userID", async () => {
			await dbManager.addHikes();
			await dbManager.addHikeRecords();


			const record = await hikeRecordsController.getRecordByStatusOpen(3);
			expect(record.userID).toBe(3)
			expect(record.hikeID).toBe(1)
			expect(record.startDate).toBe(dayjs('2018-05-13 19:18').format())
			expect(record.endDate).toBe(null)
			expect(record.status).toBe("open")
		})

		test("Incorrect userID", async () => {
			let caughtError;
			await hikeRecordsController.getRecordByStatusOpen("SomeString")
				.catch(err => caughtError = err);

			expect(caughtError).not.toBe(undefined)
			expect(caughtError).not.toBe(null)
		})
	})

})