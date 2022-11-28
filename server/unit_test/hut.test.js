const HutController = require("../Controller/HutController");
const hutController = new HutController()

describe('Hut Tests', () => {
    describe("creation of new hut", () => {
        test("Valid insertion a new hut", async () => {
            let hut
            await hutController.createHut(
                {
                    pointID: 0, name: "nameTest", latitude: 392131, longitude: 12931, municipality: "Moncalieri", province: "Turin",
                    address: "addressTest", bedspace: 5, hutOwnerID: 1
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
            expect(hut.hutOwnerID).toBe(1);
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

            let hut = await hutController.createHut(
                {
                    pointID: 0, name: "nameTest", latitude: 123, longitude: 123, municipality: "Moncalieri", province: "Turin",
                    address: "addressTest", bedspace: 1, hutOwnerID: 1
                }
            )

            hut.name = "nameTestUpdated"
            hut.latitude = 456
            hut.longitude = 456
            hut.municipality = "Caivano"
            hut.province = "Naples"
            hut.address = "addressTestUpdated"
            hut.bedspace = 2
            hut.hutOwnerID = 2

            await hutController.updateHut(hut)
            let huts = await hutController.getHuts()

            huts = huts.filter((h) => {
                return h.pointID === hut.pointID
            })
            if (huts.length !== 1)
                throw Error()
            let updatedHut = huts[0]

            expect(updatedHut.pointID).toBe(hut.pointID);
            expect(updatedHut.name).toBe(hut.name);
            expect(updatedHut.latitude).toBe(hut.latitude);
            expect(updatedHut.longitude).toBe(hut.longitude);
            expect(updatedHut.address).toBe(hut.address);
            expect(updatedHut.bedspace).toBe(hut.bedspace);
            expect(updatedHut.hutOwnerID).toBe(hut.hutOwnerID);
            expect(updatedHut.municipality).toBe(hut.municipality)
            expect(updatedHut.province).toBe(hut.province)


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

});

