const parkingLotController = require("../Controller/ParkingLotController");
const dbManager = require("../database/DBManagerSingleton").getInstance()

beforeEach(async () => await dbManager.clearDb());
afterEach(async () => await dbManager.clearDb());
//db is cleared before and after every test()

describe('Parking Lot Tests', () => {
	describe("New parking lot addition", () => {
		test("Valid parking lot", async () => {
			let caughtErr;
			let newParkingLot={
				name: 'testName',
				altitude: 123,
				latitude: 45.95681,
				longitude: 8.44742,
				municipality: 'testmunicipality',
				province: 'testprovince',
				address: 'testaddress',
				description: 'testdescription',
				carspace: 321,
				creatorID: 1,
				country: 'Italy'
			};

			await parkingLotController.addParkingLot(newParkingLot)
				.catch(err=> caughtErr=err);
			
			expect(caughtErr).toBe(undefined);
		})
		

		test("Invalid name", async () => {
			let caughtErr;
			let newParkingLot={
				name: 123,
				altitude: 123,
				latitude: 45.95681,
				longitude: 8.44742,
				municipality: 'testmunicipality',
				province: 'testprovince',
				address: 'testaddress',
				description: 'testdescription',
				carspace: 321,
				creatorID: 1,
				country: 'Italy'
			};

			await parkingLotController.addParkingLot(newParkingLot)
				.catch(err=> caughtErr=err);
			
			expect(caughtErr).not.toBe(null);
			expect(caughtErr).not.toBe(undefined);
		})

		test("Invalid altitude", async () => {
			let caughtErr;
			let newParkingLot={
				name: 'testName',
				altitude: 'invalid altitude',
				latitude: 45.95681,
				longitude: 8.44742,
				municipality: 'testmunicipality',
				province: 'testprovince',
				address: 'testaddress',
				description: 'testdescription',
				carspace: 321,
				creatorID: 1,
				country: 'Italy'
			};

			await parkingLotController.addParkingLot(newParkingLot)
				.catch(err=> caughtErr=err);
			
			expect(caughtErr).not.toBe(null);
		})

		test("Invalid latitude", async () => {
			let caughtErr;
			let newParkingLot={
				name: 'testName',
				altitude: 123,
				latitude: '45.95681',
				longitude: 8.44742,
				municipality: 'testmunicipality',
				province: 'testprovince',
				address: 'testaddress',
				description: 'testdescription',
				carspace: 321,
				creatorID: 1,
				country: 'Italy'
			};

			await parkingLotController.addParkingLot(newParkingLot)
				.catch(err=> caughtErr=err);
				
			expect(caughtErr).not.toBe(null);
		})


		test("Invalid longitude", async () => {
			let caughtErr;
			let newParkingLot={
				name: 'testName',
				altitude: 123,
				latitude: 45.95681,
				longitude: '8.44742',
				municipality: 'testmunicipality',
				province: 'testprovince',
				address: 'testaddress',
				description: 'testdescription',
				carspace: 321,
				creatorID: 1,
				country: 'Italy'
			};

			await parkingLotController.addParkingLot(newParkingLot)
				.catch(err=> caughtErr=err);
			
			expect(caughtErr).not.toBe(null);
		})


		test("Invalid municipality", async () => {
			let caughtErr;
			let newParkingLot={
				name: 'testName',
				altitude: 123,
				latitude: 45.95681,
				longitude: 8.44742,
				municipality: 123,
				province: 'testprovince',
				address: 'testaddress',
				description: 'testdescription',
				carspace: 321,
				creatorID: 1,
				country: 'Italy'
			};

			await parkingLotController.addParkingLot(newParkingLot)
				.catch(err=> caughtErr=err);
			
			expect(caughtErr).not.toBe(null);
		})


		test("Invalid province", async () => {
			let caughtErr;
			let newParkingLot={
				name: 'testName',
				altitude: 123,
				latitude: 45.95681,
				longitude: 8.44742,
				municipality: 'testmunicipality',
				province: 456,
				address: 'testaddress',
				description: 'testdescription',
				carspace: 321,
				creatorID: 1,
				country: 'Italy'
			};

			await parkingLotController.addParkingLot(newParkingLot)
				.catch(err=> caughtErr=err);
			
			expect(caughtErr).not.toBe(null);
		})


		test("Invalid address", async () => {
			let caughtErr;
			let newParkingLot={
				name: 'testName',
				altitude: 123,
				latitude: 45.95681,
				longitude: 8.44742,
				municipality: 'testmunicipality',
				province: 'testprovince',
				address: 789,
				description: 'testdescription',
				carspace: 321,
				creatorID: 1,
				country: 'Italy'
			};

			await parkingLotController.addParkingLot(newParkingLot)
				.catch(err=> caughtErr=err);
			
			expect(caughtErr).not.toBe(null);
		})


		test("Invalid description", async () => {
			let caughtErr;
			let newParkingLot={
				name: 'testName',
				altitude: 123,
				latitude: 45.95681,
				longitude: 8.44742,
				municipality: 'testmunicipality',
				province: 'testprovince',
				address: 'testaddress',
				description: 123,
				carspace: 321,
				creatorID: 1,
				country: 'Italy'
			};

			await parkingLotController.addParkingLot(newParkingLot)
				.catch(err=> caughtErr=err);
			
			expect(caughtErr).not.toBe(null);
		})

		test("Invalid carspace", async () => {
			let caughtErr;
			let newParkingLot={
				name: 'testName',
				altitude: 123,
				latitude: 45.95681,
				longitude: 8.44742,
				municipality: 'testmunicipality',
				province: 'testprovince',
				address: 'testaddress',
				description: 'testdescription',
				carspace: '321',
				creatorID: 1,
				country: 'Italy'
			};

			await parkingLotController.addParkingLot(newParkingLot)
				.catch(err=> caughtErr=err);
			
			expect(caughtErr).not.toBe(null);
		})
	})
})