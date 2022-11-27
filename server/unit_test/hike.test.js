const HikeController = require("../Controller/HikeController")
const hikeController = new HikeController()

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
})