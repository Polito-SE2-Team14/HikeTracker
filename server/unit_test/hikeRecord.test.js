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

            let newErr
            let hike = {
                title: "title", length: 10, expectedTime: 10, ascent: 10,
                difficulty: "Hiker", description: "Description", country: "Italy",
                municipality: "Torino", province: "Torino", track: [[10, 10], [11, 11]], creatorID: creatorUser.userID
            }
            await hikeController.addHike(hike)
                .catch(err => newErr = err)

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

    })

    describe("Terminate an hike", () => {
        test("Succesful end of an hike an get", async () => {
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

            let newErr
            let hike = {
                title: "title", length: 10, expectedTime: 10, ascent: 10,
                difficulty: "Hiker", description: "Description", country: "Italy",
                municipality: "Torino", province: "Torino", track: [[10, 10], [11, 11]], creatorID: creatorUser.userID
            }
            await hikeController.addHike(hike)
                .catch(err => newErr = err)

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

        })

    })

})