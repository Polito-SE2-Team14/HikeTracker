
const pointController = require("../Controller/PointController")
const userController = require("../Controller/UserController")
const crypto = require("crypto");

const pointDAO = require("../DAO/pointsDAO")


const dbManager = require("../database/DBManagerSingleton").getInstance()
const db = dbManager.getDB();

describe('Points Tests', () => {

    beforeEach(async () => {
        await dbManager.clearDb()
    }
    )
    afterAll(async () => {
        await dbManager.clearDb()
    });


    describe("Getting all points", () => {
        test("Successfull get", async () => {
            let creatorUser
            await userController.register({
                name: 'matteo', surname: 'marroni', email: 'matteo.marroni@ex.com', phoneNumber: '2222222222',
                type: "localGuide", password: crypto.randomBytes(16).toString("hex")
            }, 1, 1)
                .then(u => {
                    creatorUser = u;
                })
                .catch(err => { console.error(err); throw err; });

            const points = [
                {
                    name: "name1", description: "description1", latitude: 1, longitude: 1, altitude: 1,
                    municipality: "mun1", province: "pro1", country: "cou1", address: "add1", type: "hut", creatorID: creatorUser.userID
                },
                {
                    name: "name2", description: "description2", latitude: 1, longitude: 1, altitude: 1,
                    municipality: "mun2", province: "pro2", country: "cou2", address: "add2", type: "hut", creatorID: creatorUser.userID
                }
            ]


            const id0 = await pointDAO.createPoint(points[0])
            const id1 = await pointDAO.createPoint(points[1])

            const pointsObtained = await pointController.getAllPoints()

            expect(pointsObtained[0].pointID).toBe(id0)
            expect(pointsObtained[0].name).toBe(points[0].name)
            expect(pointsObtained[0].description).toBe(points[0].description)
            expect(pointsObtained[0].latitude).toBe(points[0].latitude)
            expect(pointsObtained[0].longitude).toBe(points[0].longitude)
            expect(pointsObtained[0].altitude).toBe(points[0].altitude)
            expect(pointsObtained[0].municipality).toBe(points[0].municipality)
            expect(pointsObtained[0].province).toBe(points[0].province)
            expect(pointsObtained[0].country).toBe(points[0].country)
            expect(pointsObtained[0].address).toBe(points[0].address)
            expect(pointsObtained[0].type).toBe(points[0].pointType)
            expect(pointsObtained[0].creatorID).toBe(creatorUser.userID)
            expect(pointsObtained[0].creatorName).toBe(creatorUser.name)
            expect(pointsObtained[0].creatorSurname).toBe(creatorUser.surname)

            expect(pointsObtained[1].pointID).toBe(id1)
            expect(pointsObtained[1].name).toBe(points[1].name)
            expect(pointsObtained[1].description).toBe(points[1].description)
            expect(pointsObtained[1].latitude).toBe(points[1].latitude)
            expect(pointsObtained[1].longitude).toBe(points[1].longitude)
            expect(pointsObtained[1].altitude).toBe(points[1].altitude)
            expect(pointsObtained[1].municipality).toBe(points[1].municipality)
            expect(pointsObtained[1].province).toBe(points[1].province)
            expect(pointsObtained[1].country).toBe(points[1].country)
            expect(pointsObtained[1].address).toBe(points[1].address)
            expect(pointsObtained[1].type).toBe(points[1].pointType)
            expect(pointsObtained[1].creatorID).toBe(creatorUser.userID)
            expect(pointsObtained[1].creatorName).toBe(creatorUser.name)
            expect(pointsObtained[1].creatorSurname).toBe(creatorUser.surname)


        })
    })

    describe("Get a single point", () => {
        test("successful get of a point", async () => {
            let creatorUser
            await userController.register({
                name: 'matteo', surname: 'marroni', email: 'matteo.marroni@ex.com', phoneNumber: '2222222222',
                type: "localGuide", password: crypto.randomBytes(16).toString("hex")
            }, 1, 1)
                .then(u => {
                    creatorUser = u;
                })
                .catch(err => { console.error(err); throw err; });

            const point=
            {
                name: "name1", description: "description1", latitude: 1, longitude: 1, altitude: 1,
                municipality: "mun1", province: "pro1", country: "cou1", address: "add1", type: "hut", creatorID: creatorUser.userID
            }
            const id = await pointDAO.createPoint(point)

            const pointObtained = await pointController.getPoint(id)

            expect(pointObtained.name).toBe(point.name)
            expect(pointObtained.description).toBe(point.description)
            expect(pointObtained.latitude).toBe(point.latitude)
            expect(pointObtained.longitude).toBe(point.longitude)
            expect(pointObtained.altitude).toBe(point.altitude)
            expect(pointObtained.municipality).toBe(point.municipality)
            expect(pointObtained.province).toBe(point.province)
            expect(pointObtained.country).toBe(point.country)
            expect(pointObtained.address).toBe(point.address)
            expect(pointObtained.type).toBe(point.pointType)
            expect(pointObtained.creatorID).toBe(creatorUser.userID)
            expect(pointObtained.creatorName).toBe(creatorUser.name)
            expect(pointObtained.creatorSurname).toBe(creatorUser.surname)
        })
    })




})