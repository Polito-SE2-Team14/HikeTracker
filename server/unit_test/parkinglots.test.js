const parkingLotController = require("../Controller/ParkingLotController");
const dbManager = require("../database/DBManagerSingleton").getInstance()

beforeEach(async () => await dbManager.clearDb());
afterEach(async () => await dbManager.clearDb());
//db is cleared before and after every test()

describe('Parking Lot Tests', () => {
    describe("Here the feature you want to test", () => {
        test("Here a test", async () => {

            //expect("the variable that you get").toBe("the variable it should be")

            expect(1).toBe(1)
            //if test doesnt test anything, the suite crashes
            //so i put this that always work

        })
        test("Here an other test", async () => {
            expect(1).toBe(1)

        })

    })
    describe("Here an other the feature you want to test", () => {
        test("Here a test", async () => {
            expect(1).toBe(1)

        })
        test("Here an other test", async () => {
            expect(1).toBe(1)

        })

    })
})