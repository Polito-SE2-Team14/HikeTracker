const crypto = require("crypto");

const dbManager = require("../database/DBManagerSingleton").getTestInstance();
const db = dbManager.getDB();
const pointsDAO = require("../DAO/pointsDAO");
const PointController = require("../Controller/PointController")
const Hut = require("../Class/Hut");
const pointController = new PointController()

describe('Hut Tests', () => {
    describe("creation of new hut", () => {
        test("Valid insertion a new hut", async () => {
            let hut
            await pointController.createHut(
                {
                    hutID: 0, name: "nameTest", latitude: 392131, longitude: 12931, municipality:"Moncalieri", province:"Turin",
                    address: "addressTest", bedspace: 5, hutOwnerID: 1
                }
                //new Hut(0, "nameTest", 392131, 12931, "addresstest", 5, 1)
            )
                .then(value => hut = value)
                .catch(err => {
                    console.error(err)
                    expect(true).toBe(false)
                    return
                }
                )

            //expect(hut instanceof Hut).toBe(true);
            expect(hut.hutID).not.toBeUndefined();
            expect(hut.name).toBe("nameTest");
            expect(hut.latitude).toBe(392131);
            expect(hut.longitude).toBe(12931);
            expect(hut.address).toBe("addressTest");
            //expect(hut.pointType).toBe("hut");
            expect(hut.bedspace).toBe(5);
            expect(hut.hutOwnerID).toBe(1);
        });

        test("Invalid name", async () => {
            let hut;
            let newErr;
            await pointController.createHut(
                {
                    hutID: 0, name: 2314214, latitude: 392131, longitude: 12931, municipality:"Moncalieri", province:"Turin",
                    address: "addressTest", bedspace: 5, hutOwnerID: 1
                }
                //new Hut(0, 312313, 123132, 12931, "addresstest", 5, 1)
            )
                .then(value => hut = value)
                .catch(err => newErr = err)
            expect(newErr).not.toBe(null)
            expect(newErr).not.toBe(undefined)

        })

        test("Invalid Latitude", async () => {
            let hut;
            let newErr;
            await pointController.createHut(
                {
                    hutID: 0, name: "nameTest", latitude: "invalid", longitude: 12931,
                    address: "addressTest", bedspace: 5, hutOwnerID: 1
                }
                //new Hut(0, "nameTest", "dawdwad", 12931, "addresstest", 5, 1)
            )
                .then(value => hut = value)
                .catch(err => newErr = err)
            expect(newErr).not.toBe(null)
            expect(newErr).not.toBe(undefined)

        })

        test("Invalid Longitude", async () => {
            let hut;
            let newErr;
            await pointController.createHut(
                {
                    hutID: 0, name: "nameTest", latitude: 392131, longitude: "invalid",
                    address: "addressTest", bedspace: 5, hutOwnerID: 1
                }
                //new Hut(0, "nameTest", 12931, "fawdfwa", "addresstest", 5, 1)
            )
                .then(value => hut = value)
                .catch(err => newErr = err)
            expect(newErr).not.toBe(null)
            expect(newErr).not.toBe(undefined)

        })

        test("Invalid address", async () => {
            let hut;
            let newErr;
            await pointController.createHut(
                {
                    hutID: 0, name: "nameTest", latitude: 392131, longitude: 12931,
                    address: 1414214, bedspace: 5, hutOwnerID: 1
                }
                //new Hut(0, "nameTest", 3123134, 12931, 14214, 5, 1)
            )
                .then(value => hut = value)
                .catch(err => newErr = err)
            expect(newErr).not.toBe(null)
            expect(newErr).not.toBe(undefined)

        })

        test("Invalid bedspace", async () => {
            let hut;
            let newErr;
            await pointController.createHut(
                {
                    hutID: 0, name: "nameTest", latitude: 392131, longitude: 12931,
                    address: "addressTest", bedspace: "invalid", hutOwnerID: 1
                }
                //new Hut(0, "nameTest", 3123134, 12931, 421124, "bedspace", 1)
            )
                .then(value => hut = value)
                .catch(err => newErr = err)
            expect(newErr).not.toBe(null)
            expect(newErr).not.toBe(undefined)

        })

        test("Invalid hutOwnerId", async () => {
            let newErr;
            await pointController.createHut(
                {
                    hutID: 0, name: "nameTest", latitude: 392131, longitude: 12931,
                    address: "addressTest", bedspace: 5, hutOwnerID: "invalid"
                }
                //new Hut(0, "nameTest", 3124, 12931, "addresstest", 5, "dawd")
            )
                .then(value => hut = value)
                .catch(err => newErr = err)


            expect(newErr).not.toBe(null)
            expect(newErr).not.toBe(undefined)


        })
    })

});

