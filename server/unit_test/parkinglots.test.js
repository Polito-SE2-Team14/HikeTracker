const parkingLotController = require("../Controller/ParkingLotController");
const dbManager = require("../database/DBManagerSingleton").getInstance()
const userController = require("../Controller/UserController")
const crypto = require("crypto");

describe('Parking Lot Tests', () => {

	beforeEach(async () => await dbManager.clearDb());
	afterAll(async () => await dbManager.clearDb());
	//db is cleared before every test()

	describe("New parking lot addition", () => {
		test("Valid parking lot", async () => {
			let caughtErr;
			let newParkingLot = {
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
				.catch(err => caughtErr = err);

			expect(caughtErr).toBe(undefined);
		})


		test("Invalid name", async () => {
			let caughtErr;
			let newParkingLot = {
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
				.catch(err => caughtErr = err);

			expect(caughtErr).not.toBe(null);
			expect(caughtErr).not.toBe(undefined);
		})

		test("Invalid altitude", async () => {
			let caughtErr;
			let newParkingLot = {
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
				.catch(err => caughtErr = err);

			expect(caughtErr).not.toBe(null);
		})

		test("Invalid latitude", async () => {
			let caughtErr;
			let newParkingLot = {
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
				.catch(err => caughtErr = err);

			expect(caughtErr).not.toBe(null);
		})


		test("Invalid longitude", async () => {
			let caughtErr;
			let newParkingLot = {
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
				.catch(err => caughtErr = err);

			expect(caughtErr).not.toBe(null);
		})


		test("Invalid municipality", async () => {
			let caughtErr;
			let newParkingLot = {
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
				.catch(err => caughtErr = err);

			expect(caughtErr).not.toBe(null);
		})


		test("Invalid province", async () => {
			let caughtErr;
			let newParkingLot = {
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
				.catch(err => caughtErr = err);

			expect(caughtErr).not.toBe(null);
		})


		test("Invalid address", async () => {
			let caughtErr;
			let newParkingLot = {
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
				.catch(err => caughtErr = err);

			expect(caughtErr).not.toBe(null);
		})


		test("Invalid description", async () => {
			let caughtErr;
			let newParkingLot = {
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
				.catch(err => caughtErr = err);

			expect(caughtErr).not.toBe(null);
		})

		test("Invalid carspace", async () => {
			let caughtErr;
			let newParkingLot = {
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
				.catch(err => caughtErr = err);

			expect(caughtErr).not.toBe(null);
		})
	})

	describe("Getting parkingLots", () => {

		test("Getting all plots", async () => {
			let creatorUser
			await userController.register({
				name: 'matteo', surname: 'marroni', email: 'matteo.marroni@ex.com', phoneNumber: '2222222222',
				type: "localGuide", password: crypto.randomBytes(16).toString("hex")
			}, 1, 1)
				.then(u => {
					creatorUser = u;
				})
				.catch(err => { console.error(err); throw err; });


			let newParkingLots = [{
				name: 'testName',
				altitude: 123,
				latitude: 45.95681,
				longitude: 8.44742,
				municipality: 'testmunicipality',
				province: 'testprovince',
				address: 'testaddress',
				description: 'testdescription',
				carspace: 321,
				creatorID: creatorUser.userID,
				country: 'Italy'
			},
			{
				name: 'testName1',
				altitude: 123,
				latitude: 45.95681,
				longitude: 8.44742,
				municipality: 'testmunicipality1',
				province: 'testprovince1',
				address: 'testaddress1',
				description: 'testdescription1',
				carspace: 321,
				creatorID: creatorUser.userID,
				country: 'Italy1'
			}
			];

			const plot0 = await parkingLotController.addParkingLot(newParkingLots[0])
			const plot1 = await parkingLotController.addParkingLot(newParkingLots[1])

			const plots = await parkingLotController.getAllParkingLots()

			expect(plot0.pointID).toBe(plots[0].pLotId)
			expect(newParkingLots[0].name).toBe(plots[0].name)
			expect(newParkingLots[0].carspace).toBe(plots[0].carspace)
			expect(newParkingLots[0].municipality).toBe(plots[0].municipality)
			expect(newParkingLots[0].province).toBe(plots[0].province)
			expect(newParkingLots[0].country).toBe(plots[0].country)
			expect(newParkingLots[0].altitude).toBe(plots[0].altitude)
			expect(newParkingLots[0].latitude).toBe(plots[0].latitude)
			expect(newParkingLots[0].longitude).toBe(plots[0].longitude)
			expect(newParkingLots[0].address).toBe(plots[0].address)
			expect("parkinglot").toBe(plots[0].pointType)
			expect(creatorUser.userID).toBe(plots[0].creatorID)
			expect(creatorUser.name).toBe(plots[0].creatorName)
			expect(creatorUser.surname).toBe(plots[0].creatorSurname)

			expect(plot1.pointID).toBe(plots[1].pLotId)
			expect(newParkingLots[1].name).toBe(plots[1].name)
			expect(newParkingLots[1].carspace).toBe(plots[1].carspace)
			expect(newParkingLots[1].municipality).toBe(plots[1].municipality)
			expect(newParkingLots[1].province).toBe(plots[1].province)
			expect(newParkingLots[1].country).toBe(plots[1].country)
			expect(newParkingLots[1].altitude).toBe(plots[1].altitude)
			expect(newParkingLots[1].latitude).toBe(plots[1].latitude)
			expect(newParkingLots[1].longitude).toBe(plots[1].longitude)
			expect(newParkingLots[1].address).toBe(plots[1].address)
			expect("parkinglot").toBe(plots[1].pointType)
			expect(creatorUser.userID).toBe(plots[1].creatorID)
			expect(creatorUser.name).toBe(plots[1].creatorName)
			expect(creatorUser.surname).toBe(plots[1].creatorSurname)




		})
		test("Get a single plot", async () => {

			let creatorUser
			await userController.register({
				name: 'matteo', surname: 'marroni', email: 'matteo.marroni@ex.com', phoneNumber: '2222222222',
				type: "localGuide", password: crypto.randomBytes(16).toString("hex")
			}, 1, 1)
				.then(u => {
					creatorUser = u;
				})
				.catch(err => { console.error(err); throw err; });

			let newParkingLot = {
				name: 'testName',
				altitude: 123,
				latitude: 45.95681,
				longitude: 8.44742,
				municipality: 'testmunicipality',
				province: 'testprovince',
				address: 'testaddress',
				description: 'testdescription',
				carspace: 321,
				creatorID: creatorUser.userID,
				country: 'Italy'
			};

			const newPlot = await parkingLotController.addParkingLot(newParkingLot)

			const exists = await parkingLotController.parkingLotExists(newPlot.pointID);
			expect(exists).toBe(true)

			const plot = await parkingLotController.getParkingLotById(newPlot.pointID)
			expect(newParkingLot.carspace).toBe(plot.carspace)
			expect(newPlot.pointID).toBe(plot.parkingLotId)


		})
	})


	describe("Delete parking lot", () => {
		test("Delete parking lot", async () => {
			let caughtErr;
			let newParkingLot = {
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

			let addedParkingLot = await parkingLotController.addParkingLot(newParkingLot)
				.catch(err => caughtErr = err);

			await parkingLotController.deleteParkingLot(addedParkingLot.pointID)
				.catch(err => caughtErr = err);

			expect(caughtErr).toBe(undefined);
		})
	})
})