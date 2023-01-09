const hikeController = require("../Controller/HikeController")

const DBManager = require("../database/DBManager");
/**@type {DBManager} */
const dbManager = require("../database/DBManagerSingleton").getInstance()
const db = dbManager.getDB();

describe('Hike Tests', () => {
	beforeAll(async () => await dbManager.clearDb());
	afterEach(async () => await dbManager.clearDb());

	beforeEach(async () => await dbManager.addUsers());

	describe("creation of new Hike", () => {
		test("Valid creation", async () => {
			const hike = {
				hikeID: 1,
				title: "title",
				length: 10,
				expectedTime: 10,
				ascent: 10,
				difficulty: "Hiker",
				description: "Description",
				country: "Italy",
				municipality: "Torino",
				province: "Torino",
				track: [[10, 10], [11, 11]],
				creatorID: 6
			}

			let newErr
			await hikeController.addHike(hike)
				.catch(err => newErr = err)

			const data = await getHikes();

			expect(newErr).toBeUndefined()

			expect(data.length).toBe(1);
			expect(data[0].title).toBe(hike.title)
			expect(data[0].length).toBe(hike.length)
			expect(data[0].expectedTime).toBe(hike.expectedTime)
			expect(data[0].ascent).toBe(hike.ascent)
			expect(data[0].difficulty).toBe(hike.difficulty)
			expect(data[0].description).toBe(hike.description)
			expect(data[0].country).toBe(hike.country)
			expect(data[0].municipality).toBe(hike.municipality)
			expect(data[0].province).toBe(hike.province)
			expect(data[0].creatorID).toBe(hike.creatorID)
		})


		test("Invalid title", async () => {
			let newErr
			let hike = {
				title: 10, length: 10, expectedTime: 10, ascent: 10,
				difficulty: "Hiker", description: "WDFAFAWFAWFAWF",
				country: 'Italy', municipality: "Torino", province: "Torino",
				creatorID: 4
			}
			await hikeController.addHike(hike)
				.catch(err => newErr = err)

			let newHike = await getHike(1);

			expect(newErr).not.toBeNull();
			expect(newErr).not.toBeUndefined();
			expect(newHike).toBeUndefined();
		})

		test("Invalid length", async () => {
			let newErr
			let hike = {
				title: "Title", length: "invalid", expectedTime: 10, ascent: 10,
				difficulty: "Hiker", description: "Description",
				country: 'Italy', municipality: "Torino", province: "Torino",
				creatorID: 4
			}
			await hikeController.addHike(hike)
				.catch(err => newErr = err)

			let newHike = await getHike(1);

			expect(newErr).not.toBeNull();
			expect(newErr).not.toBeUndefined();
			expect(newHike).toBeUndefined();
		})

		test("Invalid expectedTime", async () => {
			let newErr
			let hike = {
				title: "Title", length: 10, expectedTime: "Invalid", ascent: 10,
				difficulty: "Hiker", description: "Description",
				country: 'Italy', municipality: "Torino", province: "Torino",
				creatorID: 4
			}
			await hikeController.addHike(hike)
				.catch(err => newErr = err)

			let newHike = await getHike(1);

			expect(newErr).not.toBeNull();
			expect(newErr).not.toBeUndefined();
			expect(newHike).toBeUndefined();

		})

		test("Invalid ascent", async () => {
			let newErr
			let hike = {
				title: "Title", length: 10, expectedTime: 10, ascent: "Invalid",
				difficulty: "Hiker", description: "Description",
				country: 'Italy', municipality: "Torino", province: "Torino",
				creatorID: 4
			}
			await hikeController.addHike(hike)
				.catch(err => newErr = err)

			let newHike = await getHike(1);

			expect(newErr).not.toBeNull();
			expect(newErr).not.toBeUndefined();
			expect(newHike).toBeUndefined();

		})
		test("Invalid description", async () => {
			let newErr
			let hike = {
				title: "Title", length: 10, expectedTime: 10, ascent: 10,
				difficulty: "Hiker", description: 10,
				country: 'Italy', municipality: "Torino", province: "Torino",
				creatorID: 4
			}
			await hikeController.addHike(hike)
				.catch(err => newErr = err)

			let newHike = await getHike(1);

			expect(newErr).not.toBeNull();
			expect(newErr).not.toBeUndefined();
			expect(newHike).toBeUndefined();
		})

		test("Invalid country", async () => {
			let newErr
			let hike = {
				title: "Title", length: 10, expectedTime: 10, ascent: 10,
				difficulty: "Hiker", description: 'Description',
				country: 10, municipality: "Torino", province: "Torino",
				creatorID: 4
			}
			await hikeController.addHike(hike)
				.catch(err => newErr = err)

			let newHike = await getHike(1);

			expect(newErr).not.toBeNull();
			expect(newErr).not.toBeUndefined();
			expect(newHike).toBeUndefined();
		})

		test("Invalid Municipality", async () => {
			let newErr
			let hike = {
				title: "Title", length: 10, expectedTime: 10, ascent: 10,
				difficulty: "Hiker", description: "Description",
				country: 'Italy', municipality: 10, province: "Torino",
				creatorID: 4
			}
			await hikeController.addHike(hike)
				.catch(err => newErr = err)

			let newHike = await getHike(1);

			expect(newErr).not.toBeNull();
			expect(newErr).not.toBeUndefined();
			expect(newHike).toBeUndefined();
		})

		test("Invalid province", async () => {
			let newErr
			let hike = {
				title: "Title", length: 10, expectedTime: 10, ascent: 10,
				difficulty: "Hiker", description: "Description",
				country: 'Italy', municipality: "Torino", province: 10,
				creatorID: 4
			}
			await hikeController.addHike(hike)
				.catch(err => newErr = err)

			let newHike = await getHike(1);

			expect(newErr).not.toBeNull();
			expect(newErr).not.toBeUndefined();
			expect(newHike).toBeUndefined();
		})

		test("Invalid difficulty (not standard)", async () => {
			let newErr
			let hike = {
				title: "Title", length: 10, expectedTime: 10, ascent: 10,
				difficulty: "InvalidDifficulty", description: "Description",
				country: 'Italy', municipality: "Torino", province: "Torino",
				creatorID: 4
			}
			await hikeController.addHike(hike)
				.catch(err => newErr = err)

			let newHike = await getHike(1);

			expect(newErr).not.toBeNull();
			expect(newErr).not.toBeUndefined();
			expect(newHike).toBeUndefined();
		})

		test("Invalid difficulty (not string)", async () => {
			let newErr
			let hike = {
				title: "Title", length: 10, expectedTime: 10, ascent: 10,
				difficulty: 10, description: "Description",
				country: 'Italy', municipality: "Torino", province: "Torino",
				creatorID: 4
			}
			await hikeController.addHike(hike)
				.catch(err => newErr = err)

			let newHike = await getHike(1);

			expect(newErr).not.toBeNull();
			expect(newErr).not.toBeUndefined();
			expect(newHike).toBeUndefined();
		})

		test("Invalid creatorID (NaN)", async () => {
			let newErr
			let hike = {
				title: "Title", length: 10, expectedTime: 10, ascent: 10,
				difficulty: 'Tourist', description: "Description",
				country: 'Italy', municipality: "Torino", province: "Torino",
				creatorID: "invalid"
			}
			await hikeController.addHike(hike)
				.catch(err => newErr = err)

			let newHike = await getHike(1);

			expect(newErr).not.toBeNull();
			expect(newErr).not.toBeUndefined();
			expect(newHike).toBeUndefined();
		})

		test("Invalid creatorID (non existent ID)", async () => {
			let newErr
			let hike = {
				title: "Title", length: 10, expectedTime: 10, ascent: 10,
				difficulty: 'Tourist', description: "Description",
				country: 'Italy', municipality: "Torino", province: "Torino",
				creatorID: "invalid"
			}
			await hikeController.addHike(hike)
				.catch(err => newErr = err)

			let newHike = await getHike(1);

			expect(newErr).not.toBeNull();
			expect(newErr).not.toBeUndefined();
			expect(newHike).toBeUndefined();
		})

		test("Invalid creatorID (unauthorized User)", async () => {
			let newErr
			let hike = {
				title: "Title", length: 10, expectedTime: 10, ascent: 10,
				difficulty: 'Tourist', description: "Description",
				country: 'Italy', municipality: "Torino", province: "Torino",
				creatorID: 3
			}
			await hikeController.addHike(hike)
				.catch(err => newErr = err)

			let newHike = await getHike(1);

			expect(newErr).not.toBeNull();
			expect(newErr).not.toBeUndefined();
			expect(newHike).toBeUndefined();
		})
	})

	describe("Getting hikes", () => {
		test('Get hikes list empty', async () => {
			let newErr;

			let hikes = await hikeController.getAllHikes()
				.catch(err => newErr = err);

			expect(newErr).toBeUndefined();
			expect(hikes.length).toBe(0);
		});

		test('Get hikes list not empty', async () => {
			await dbManager.addHikes();

			let newErr;
			let hikes = await hikeController.getAllHikes()
				.catch(err => newErr = err);

			expect(newErr).toBeUndefined();
			expect(hikes.length).toBe(3);
		});

		test('Get hike with invalid hikeID', async () => {
			let newErr;

			let hike = await hikeController.getHike('invalid')
				.catch(err => newErr = err);

			expect(newErr).not.toBeUndefined();
			expect(hike.hikeID).toBeUndefined();
		});

		test('Get non existing hike', async () => {
			let newErr;

			let hike = await hikeController.getHike(1)
				.catch(err => newErr = err);

			expect(newErr).not.toBeUndefined();
			expect(hike.hikeID).toBeUndefined();
		});

		test('Get existing hike', async () => {
			await dbManager.addHikes();

			let newErr;
			let hike = await hikeController.getHike(1)
				.catch(err => newErr = err);

			expect(newErr).toBeUndefined();
			expect(hike.hikeID).toBe(1);
		});
	});

	describe("Delete hike", () => {
		test('Delete hike with invalid hikeID', async () => {
			await dbManager.addHikes();

			let newErr;
			await hikeController.deleteHike('invalid')
				.catch(err => newErr = err);

			let hikes = await getHikes();

			expect(newErr).not.toBeUndefined();
			expect(hikes.length).toBe(3);
		});

		test('Delete non existing hike', async () => {
			await dbManager.addHikes();

			let newErr;
			await hikeController.deleteHike(12)
				.catch(err => newErr = err);

			expect(newErr).not.toBeUndefined()

			let hikes = await getHikes();

			expect(hikes.length).toBe(3);
		});

		test('Delete existing hike', async () => {
			await dbManager.addHikes();

			await hikeController.deleteHike(1)

			let hikes = await getHikes();

			expect(hikes.length).toBe(2);
		});
	});

	describe("link start", () => {
		test("Valid hike and start point", async () => {
			await dbManager.addHikes();
			await dbManager.addHuts();

			let caughtError;
			await hikeController.setStart(1, 1)
				.catch(err => caughtError = err);

			expect(caughtError).toBeUndefined();
		})
		test("Invalid hike, valid start point", async () => {
			await dbManager.addHuts();

			let caughtError;
			await hikeController.setStart("hike1", 1)
				.catch(err => caughtError = err);

			expect(caughtError).not.toBe(undefined);
		})
		test("Valid hike, invalid start point", async () => {
			await dbManager.addHikes();

			let caughtError;
			await hikeController.setStart(1, "point1")
				.catch(err => caughtError = err);

			expect(caughtError).not.toBe(undefined);
		})
	})
	describe("link end", () => {
		test("Valid hike and end point", async () => {
			await dbManager.addHikes();
			await dbManager.addHuts();

			let caughtError;
			await hikeController.setEnd(1, 2)
				.catch(err => caughtError = err);

			expect(caughtError).toBe(undefined);
		})
		test("Invalid hike, valid end point", async () => {
			await dbManager.addHuts();

			let caughtError;
			await hikeController.setEnd("hike1", 2)
				.catch(err => caughtError = err);

			expect(caughtError).not.toBe(undefined);
		})
		test("Valid hike, invalid end point", async () => {
			await dbManager.addHikes();

			let caughtError;
			await hikeController.setEnd(1, "point2")
				.catch(err => caughtError = err);

			expect(caughtError).not.toBe(undefined);
		})
	})
	describe("reference points", () => {
		test("successful creation of reference points", async () => {
			await dbManager.addHikes();

			let referencePoint = {
				name: "Nome del reference point",
				description: "Descrizione del reference point",
				latitude: 123,
				longitude: 456,
				altitude: 789,
				municipality: "municipality",
				province: "province",
				country: "country",
				creatorID: 6,
				type: "generic",
			}
			let referencePointID;

			await hikeController.addReferencePoint(1, referencePoint)
				.then(id => referencePointID = id)
				.catch(err => { console.error(err); throw err })

			let insertedRefencePoint
			await hikeController.getReferencePointsForHike(1)
				.then(rp => insertedRefencePoint = rp[0])
				.catch(err => { console.error(err); throw err })

			expect(referencePointID).toBe(1)
			expect(referencePoint.name).toBe(insertedRefencePoint.name)
			expect(referencePoint.description).toBe(insertedRefencePoint.description)
			expect(referencePoint.latitude).toBe(insertedRefencePoint.latitude)
			expect(referencePoint.longitude).toBe(insertedRefencePoint.longitude)
			expect(referencePoint.altitude).toBe(insertedRefencePoint.altitude)
			expect(referencePoint.municipality).toBe(insertedRefencePoint.municipality)
			expect(referencePoint.province).toBe(insertedRefencePoint.province)
			expect(referencePoint.country).toBe(insertedRefencePoint.country)
			expect(referencePoint.creatorID).toBe(insertedRefencePoint.creatorID)

		})
	})
	
	describe("Get huts close to an hike", () => {
		test("Valid hikeID", async () => {
			await dbManager.addHikes();
			await dbManager.addHuts();

			let caughtError;
			let huts = await hikeController.getCloseHutsForHike(1)
				.catch(err => caughtError = err);

			expect(caughtError).toBe(undefined);
			expect(huts).not.toBe(null);
		})
		test("Invalid hikeID", async () => {
			let caughtError;
			await hikeController.getCloseHutsForHike('hike1')
				.catch(err => {
					caughtError = err;
				});
			expect(caughtError).not.toBe(undefined);
		})
	})
	describe("Link a hut to an hike", () => {
		test("Valid hutID to valid hikeID", async () => {
			await dbManager.addHikes();
			await dbManager.addHuts();

			let caughtError;
			let newLink = await hikeController.linkHutToHike(1, 3)
				.catch(err => caughtError = err);

			expect(caughtError).toBe(undefined);
			expect(newLink).not.toBe(null);
			expect(newLink.hutID).toBe(1);
			expect(newLink.hikeID).toBe(3);
		})

		test("Invalid hutID to valid hikeID", async () => {
			await dbManager.addHikes();

			let caughtError;
			await hikeController.linkHutToHike("hut1", 3)
				.catch(err => caughtError = err);

			expect(caughtError).not.toBe(undefined);
		})

		test("Valid hutID to invalid hikeID", async () => {
			await dbManager.addHuts();

			let caughtError;
			await hikeController.linkHutToHike(1, "hike1")
				.catch(err => caughtError = err);

			expect(caughtError).not.toBe(undefined);
		})
	})

	describe("Remove hut-hike link", () => {
		test("Valid hutID to valid hikeID", async () => {
			await dbManager.addHikes();
			await dbManager.addHuts();

			let caughtError;
			let deletedLink = await hikeController.deleteHutToHikeLink(1, 3)
				.catch(err => caughtError = err);

			expect(caughtError).toBe(undefined);
			expect(deletedLink).not.toBe(null);
			expect(deletedLink.hutID).toBe(1);
			expect(deletedLink.hikeID).toBe(3);
		})

		test("Invalid hutID to valid hikeID", async () => {
			await dbManager.addHikes();

			let caughtError;
			await hikeController.deleteHutToHikeLink("hut1", 3)
				.catch(err => caughtError = err);

			expect(caughtError).not.toBe(undefined);
		})

		test("Valid hutID to invalid hikeID", async () => {
			await dbManager.addHuts();

			let caughtError;
			await hikeController.deleteHutToHikeLink(1, "hike1")
				.catch(err => caughtError = err);

			expect(caughtError).not.toBe(undefined);
		})
	})
})

function getHikes() {
	return new Promise((resolve, reject) => {
		let sql = 'SELECT * FROM Hike';

		db.all(sql, [], (err, rows) => resolve(rows));
	});
}

function getHike(hikeId) {
	return new Promise((resolve, reject) => {
		let sql = 'SELECT * FROM Hike WHERE hikeId = ?';

		db.get(sql, [hikeId], (err, row) => resolve(row));
	});
}