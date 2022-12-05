const hikeController = require("../Controller/HikeController")




describe('Hike Tests', () => {
    describe("creation of new Hike", () => {
        test("Invalid title", async () => {
            let newErr
            let hike = {
                title: 10, length: 10, expectedTime: 10, ascent: 10,
                difficulty: "Hiker", description: "Description",
                municipality: "Torino", province: "Torino"
            }
            await hikeController.addHike(hike)
                .catch(err => newErr = err)

            expect(newErr).not.toBe(null)
            expect(newErr).not.toBe(undefined)
        })

        test("Invalid length", async () => {
            let newErr
            let hike = {
                title: "Title", length: "invalid", expectedTime: 10, ascent: 10,
                difficulty: "Hiker", description: "Description",
                municipality: "Torino", province: "Torino"
            }
            await hikeController.addHike(hike)
                .catch(err => newErr = err)
            expect(newErr).not.toBe(null)
            expect(newErr).not.toBe(undefined)
        })

        test("Invalid expectedTime", async () => {
            let newErr
            let hike = {
                title: "Title", length: 10, expectedTime: "Invalid", ascent: 10,
                difficulty: "Hiker", description: "Description",
                municipality: "Torino", province: "Torino"
            }
            await hikeController.addHike(hike)
                .catch(err => newErr = err)
            expect(newErr).not.toBe(null)
            expect(newErr).not.toBe(undefined)

        })

        test("Invalid ascent", async () => {
            let newErr
            let hike = {
                title: "Title", length: 10, expectedTime: 10, ascent: "Invalid",
                difficulty: "Hiker", description: "Description",
                municipality: "Torino", province: "Torino"
            }
            await hikeController.addHike(hike)
                .catch(err => newErr = err)
            expect(newErr).not.toBe(null)
            expect(newErr).not.toBe(undefined)

        })
        test("Invalid Description", async () => {
            let newErr
            let hike = {
                title: "Title", length: 10, expectedTime: 10, ascent: 10,
                difficulty: "Hiker", description: 10,
                municipality: "Torino", province: "Torino"
            }
            await hikeController.addHike(hike)
                .catch(err => newErr = err)
            expect(newErr).not.toBe(null)
            expect(newErr).not.toBe(undefined)
        })

        test("Invalid Municipality", async () => {
            let newErr
            let hike = {
                title: "Title", length: 10, expectedTime: 10, ascent: 10,
                difficulty: "Hiker", description: "Description",
                municipality: 10, province: "Torino"
            }
            await hikeController.addHike(hike)
                .catch(err => newErr = err)
            expect(newErr).not.toBe(null)
            expect(newErr).not.toBe(undefined)
        })

        test("Invalid province", async () => {
            let newErr
            let hike = {
                title: "Title", length: 10, expectedTime: 10, ascent: 10,
                difficulty: "Hiker", description: "Description",
                municipality: "Torino", province: 10
            }
            await hikeController.addHike(hike)
                .catch(err => newErr = err)
            expect(newErr).not.toBe(null)
            expect(newErr).not.toBe(undefined)
        })

        test("Invalid difficulty (not standard)", async () => {
            let newErr
            let hike = {
                title: "Title", length: 10, expectedTime: 10, ascent: 10,
                difficulty: "InvalidDifficulty", description: "Description",
                municipality: "Torino", province: "Torino"
            }
            await hikeController.addHike(hike)
                .catch(err => newErr = err)
            expect(newErr).not.toBe(null)
            expect(newErr).not.toBe(undefined)
        })

        test("Invalid difficulty (not string)", async () => {
            let newErr
            let hike = {
                title: "Title", length: 10, expectedTime: 10, ascent: 10,
                difficulty: 10, description: "Description",
                municipality: "Torino", province: "Torino"
            }
            await hikeController.addHike(hike)
                .catch(err => newErr = err)
            expect(newErr).not.toBe(null)
            expect(newErr).not.toBe(undefined)
        })
    })
    describe("Getting all hikes", () => {

    })
    describe("link start", () => {

    })
    describe("link end", () => {

    })
    describe("reference points", () => {
        /* test("successful creation of reference points", async () => {
            let hike = {
                title: "Title", length: 10, expectedTime: 10, ascent: 10,
                difficulty: "Hiker", description: "Description",
                municipality: "Torino", province: "Torino"
            }

            let insertedHike, insertedRefencePoint
            await hikeController.addHike(hike)
                .then(h => insertedHike = h)
                .catch(err => { throw err })

            console.log(insertedHike)

            let referencePoint = {
                name: "Nome del reference point",
                description: "Descrizione del reference point",
                latitude: 123,
                longitude: 456,
                altitude: 789,
                municipality: "municipality",
                province: "province",
                country: "country",
                creatorID: 123
            }
            let referencePointID;

            await hikeController.addReferencePoint(insertedHike.hikeID, referencePoint)
                .then(id => referencePointID = id)


            await hikeController.getReferencePointsForHike(insertedHike.hikeID)
                .then(rp => insertedRefencePoint = rp[0])

            expect(referencePoint.name).toBe(insertedRefencePoint.name)
            expect(referencePoint.description).toBe(insertedRefencePoint.description)
            expect(referencePoint.latitude).toBe(insertedRefencePoint.latitude)
            expect(referencePoint.longitude).toBe(insertedRefencePoint.longitude)
            expect(referencePoint.altitude).toBe(insertedRefencePoint.altitude)
            expect(referencePoint.municipality).toBe(insertedRefencePoint.municipality)
            expect(referencePoint.province).toBe(insertedRefencePoint.province)
            expect(referencePoint.country).toBe(insertedRefencePoint.country)
            expect(referencePoint.creatorID).toBe(insertedRefencePoint.creatorID)

        }) */
    })
    describe("delete an hike", () => {
        /* test("successful remove of an hike", async () => {
            let hike = {
                title: "Title", length: 10, expectedTime: 10, ascent: 10,
                difficulty: "Hiker", description: "Description",
                municipality: "Torino", province: "Torino"
            }

            let insertedHike
            await hikeController.addHike(hike)
                .then(h => insertedHike = h)
                .catch(err => { throw err })

            let askedHike
            await hikeController.getHike(insertedHike.hikeID)
                .then(h => askedHike = h)

            await hikeController.deleteHike(insertedHike.hikeID)

            await hikeController.getHike(insertedHike.hikeID)
                .then(h => askedHike = h)

            expect(askedHike).toBe(null)
        })*/
    }) 

})