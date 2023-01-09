const hutController = require("../Controller/HutController");
const dbManager = require("../database/DBManagerSingleton").getInstance()
const userController = require("../Controller/UserController")
const crypto = require("crypto");

describe('Hut Tests', () => {
    beforeAll(async () => await dbManager.clearDb());
    afterEach(async () => await dbManager.clearDb());

    describe("creation of new hut", () => {
        test("Valid insertion a new hut", async () => {
            let hut, user
            await userController.register({
                name: 'matteo', surname: 'marroni', email: 'matteo.marroni@ex.com', phoneNumber: '2222222222',
                type: "localGuide", password: crypto.randomBytes(16).toString("hex")
            }, 1, 1)
                .then(u => {
                    user = u;
                })
                .catch(err => { console.error(err); throw err; });

            await hutController.createHut(
                {
                    pointID: 0, name: "nameTest", latitude: 392131, longitude: 12931, municipality: "Moncalieri", province: "Turin",
                    address: "addressTest", bedspace: 5, creatorID: user.userID
                }
            )
                .then(value => hut = value)
                .catch(err => {
                    console.error(err)
                    expect(true).toBe(false)
                }
                )

            expect(hut.pointID).not.toBeUndefined();
            expect(hut.name).toBe("nameTest");
            expect(hut.latitude).toBe(392131);
            expect(hut.longitude).toBe(12931);
            expect(hut.address).toBe("addressTest");
            expect(hut.bedspace).toBe(5);
            expect(hut.creatorID).toBe(1);
        });

        test("Invalid name", async () => {
            let newErr;
            await hutController.createHut(
                {
                    pointID: 0, name: 2314214, latitude: 392131, longitude: 12931, municipality: "Moncalieri", province: "Turin",
                    address: "addressTest", bedspace: 5, hutOwnerID: 1
                }
            )
                .catch(err => newErr = err)
            expect(newErr).not.toBe(null)
            expect(newErr).not.toBe(undefined)

        })

        test("Invalid Latitude", async () => {
            let newErr;
            await hutController.createHut(
                {
                    pointID: 0, name: "nameTest", latitude: "invalid", longitude: 12931,
                    address: "addressTest", bedspace: 5, hutOwnerID: 1
                }
            )
                .catch(err => newErr = err)
            expect(newErr).not.toBe(null)
            expect(newErr).not.toBe(undefined)

        })

        test("Invalid Longitude", async () => {
            let newErr;
            await hutController.createHut(
                {
                    pointID: 0, name: "nameTest", latitude: 392131, longitude: "invalid",
                    address: "addressTest", bedspace: 5, hutOwnerID: 1
                }
            )
                .catch(err => newErr = err)
            expect(newErr).not.toBe(null)
            expect(newErr).not.toBe(undefined)

        })

        test("Invalid address", async () => {
            let newErr;
            await hutController.createHut(
                {
                    pointID: 0, name: "nameTest", latitude: 392131, longitude: 12931,
                    address: 1414214, bedspace: 5, hutOwnerID: 1
                }
            )
                .catch(err => newErr = err)
            expect(newErr).not.toBe(null)
            expect(newErr).not.toBe(undefined)

        })

        test("Invalid bedspace", async () => {
            let newErr;
            await hutController.createHut(
                {
                    pointID: 0, name: "nameTest", latitude: 392131, longitude: 12931,
                    address: "addressTest", bedspace: "invalid", hutOwnerID: 1
                }
            )
                .catch(err => newErr = err)
            expect(newErr).not.toBe(null)
            expect(newErr).not.toBe(undefined)

        })

        test("Invalid hutOwnerId", async () => {
            let newErr;
            await hutController.createHut(
                {
                    pointID: 0, name: "nameTest", latitude: 392131, longitude: 12931,
                    address: "addressTest", bedspace: 5, hutOwnerID: "invalid"
                }
            )
                .catch(err => newErr = err)


            expect(newErr).not.toBe(null)
            expect(newErr).not.toBe(undefined)


        })
    })
    describe("Update of new hut", () => {
        test("Valid update of a hut", async () => {


            await userController.register({
                name: 'matteo', surname: 'marroni', email: 'matteo.marroni@ex.com', phoneNumber: '2222222222',
                type: "localGuide", password: crypto.randomBytes(16).toString("hex")
            }, 1, 1).catch(err => { console.error(err); throw err; });

            let oldHut = {
                name: "nameTest", latitude: 123, longitude: 123, municipality: "Moncalieri", province: "Turin",
                address: "addressTest", bedspace: 1, creatorID: 1
            }

            oldHut = await hutController.createHut(oldHut)


            oldHut.name = "nameTestUpdated"
            oldHut.latitude = 456
            oldHut.longitude = 456
            oldHut.municipality = "Caivano"
            oldHut.province = "Naples"
            oldHut.address = "addressTestUpdated"
            oldHut.bedspace = 2
            oldHut.hutOwnerID = 2

            await hutController.updateHut(oldHut)

            let allHuts = await hutController.getHuts()

            allHuts = allHuts.filter((h) => {
                return h.pointID === oldHut.pointID
            })
            if (allHuts.length !== 1)
                throw Error()
            let updatedHut = allHuts[0]

            expect(updatedHut.name).toBe(oldHut.name);
            expect(updatedHut.latitude).toBe(oldHut.latitude);
            expect(updatedHut.longitude).toBe(oldHut.longitude);
            expect(updatedHut.address).toBe(oldHut.address);
            expect(updatedHut.bedspace).toBe(oldHut.bedspace);
            expect(updatedHut.municipality).toBe(oldHut.municipality)
            expect(updatedHut.province).toBe(oldHut.province)


        });

        test("Invalid name of hut", async () => {
            let newErr;
            await hutController.updateHut(
                {
                    pointID: 0, name: 12313, latitude: 123, longitude: 123, municipality: "Moncalieri", province: "Turin",
                    address: "addressTest", bedspace: 1, hutOwnerID: 1
                })
                .catch(err => newErr = err)
            expect(newErr).not.toBe(null)
            expect(newErr).not.toBe(undefined)
        });


        test("Invalid latitude of hut", async () => {
            let newErr;
            await hutController.updateHut(
                {
                    pointID: 0, name: "test", latitude: "fawfa", longitude: 123, municipality: "Moncalieri", province: "Turin",
                    address: "addressTest", bedspace: 1, hutOwnerID: 1
                })
                .catch(err => newErr = err)
            expect(newErr).not.toBe(null)
            expect(newErr).not.toBe(undefined)
        });


        test("Invalid longitude of hut", async () => {
            let newErr;
            await hutController.updateHut(
                {
                    pointID: 0, name: "test", latitude: 123, longitude: "invalid", municipality: "Moncalieri", province: "Turin",
                    address: "addressTest", bedspace: 1, hutOwnerID: 1
                })
                .catch(err => newErr = err)
            expect(newErr).not.toBe(null)
            expect(newErr).not.toBe(undefined)
        });

        test("Invalid address of hut", async () => {
            let newErr;
            await hutController.updateHut(
                {
                    pointID: 0, name: "test", latitude: 123, longitude: 123, municipality: "Moncalieri", province: "Turin",
                    address: 5241, bedspace: 1, hutOwnerID: 1
                })
                .catch(err => newErr = err)
            expect(newErr).not.toBe(null)
            expect(newErr).not.toBe(undefined)
        });

        test("Invalid bedspace of hut", async () => {
            let newErr;
            await hutController.updateHut(
                {
                    pointID: 0, name: "test", latitude: 123, longitude: 123, municipality: "Moncalieri", province: "Turin",
                    address: "addressTest", bedspace: "ddwad", hutOwnerID: 1
                })
                .catch(err => newErr = err)
            expect(newErr).not.toBe(null)
            expect(newErr).not.toBe(undefined)
        });

        test("Invalid municipality of hut", async () => {
            let newErr;
            await hutController.updateHut(
                {
                    pointID: 0, name: "test", latitude: 123, longitude: 123, municipality: 2313, province: "Turin",
                    address: "addressTest", bedspace: 1, hutOwnerID: 1
                })
                .catch(err => newErr = err)
            expect(newErr).not.toBe(null)
            expect(newErr).not.toBe(undefined)
        });

        test("Invalid province of hut", async () => {
            let newErr;
            await hutController.updateHut(
                {
                    pointID: 0, name: "test", latitude: 123, longitude: 123, municipality: "Moncalieri", province: 31231,
                    address: "addressTest", bedspace: 1, hutOwnerID: 1
                })
                .catch(err => newErr = err)
            expect(newErr).not.toBe(null)
            expect(newErr).not.toBe(undefined)
        });


    })
    describe("Get all huts", () => {
        
    })
    describe("Delete an hut", () => {
        
    })


});

