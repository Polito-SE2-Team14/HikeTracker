const path = require('path');
const { writeFile, readFileSync } = require("fs");

const hikeController = require("../Controller/HikeController");
const dbManager = require("../database/DBManagerSingleton").getInstance();
const db = dbManager.getDB();

beforeAll(async () => {
	const sql = 'INSERT INTO User(userID, type, verified, approved) VALUES(?, ?, ?, ?)';
	const users = [
		[1, 'hiker', 0, 0],
		[2, 'hiker', 1, 0],
		[3, 'localGuide', 0, 0],
		[4, 'localGuide', 1, 0],
		[5, 'localGuide', 1, 1],
		[6, 'hutWorker', 0, 0],
		[7, 'hutWorker', 1, 0],
		[8, 'hutWorker', 1, 1]
	];

	await Promise.all(
		users.map(u =>
			new Promise((resolve, reject) =>
				db.run(sql, u, err => resolve())
			)
		)
	);
});
beforeEach(async () => await dbManager.deleteAllHikes());
afterAll(async () => await dbManager.clearDb());

describe('Hike Tests', () => {
	describe("Creation of new hike", () => {
		test("Invalid title", async () => {
			let newErr
			let hike = {
				title: 10, length: 10, expectedTime: 10, ascent: 10,
				difficulty: "Hiker", description: "Description",
				country: 'Italy', municipality: "Torino", province: "Torino",
				creatorID: 4
			}
			await hikeController.addHike(hike)
				.catch(err => newErr = err)

			let newHike = await getHike(1);

			expect(newErr).not.toBe(null)
			expect(newErr).not.toBe(undefined)
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

			expect(newErr).not.toBe(null)
			expect(newErr).not.toBe(undefined)
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

			expect(newErr).not.toBe(null)
			expect(newErr).not.toBe(undefined)
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

			expect(newErr).not.toBe(null)
			expect(newErr).not.toBe(undefined)
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

			expect(newErr).not.toBe(null)
			expect(newErr).not.toBe(undefined)
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

			expect(newErr).not.toBe(null)
			expect(newErr).not.toBe(undefined)
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

			expect(newErr).not.toBe(null)
			expect(newErr).not.toBe(undefined)
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

			expect(newErr).not.toBe(null)
			expect(newErr).not.toBe(undefined)
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

			expect(newErr).not.toBe(null)
			expect(newErr).not.toBe(undefined)
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

			expect(newErr).not.toBe(null)
			expect(newErr).not.toBe(undefined)
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

			expect(newErr).not.toBe(null)
			expect(newErr).not.toBe(undefined)
			expect(newHike).toBeUndefined();
		})

		// test("Invalid creatorID (non existent ID)", async () => {
		// 	let newErr
		// 	let hike = {
		// 		title: "Title", length: 10, expectedTime: 10, ascent: 10,
		// 		difficulty: 'Tourist', description: "Description",
		// 		country: 'Italy', municipality: "Torino", province: "Torino",
		// 		creatorID: 10
		// 	}
		// 	await hikeController.addHike(hike)
		// 		.catch(err => newErr = err)

		// 	let newHike = await getHike(1);

		// 	expect(newErr).not.toBe(null)
		// 	expect(newErr).not.toBe(undefined)
		// 	expect(newHike).toBeUndefined();
		// })

		// test("Invalid creatorID (unautorized User)", async () => {
		// 	let newErr
		// 	let hike = {
		// 		title: "Title", length: 10, expectedTime: 10, ascent: 10,
		// 		difficulty: 'Tourist', description: "Description",
		// 		country: 'Italy', municipality: "Torino", province: "Torino",
		// 		creatorID: 2
		// 	}
		// 	await hikeController.addHike(hike)
		// 		.catch(err => newErr = err)

		// 	let newHike = await getHike(1);

		// 	expect(newErr).not.toBe(null)
		// 	expect(newErr).not.toBe(undefined)
		// 	expect(newHike).toBeUndefined();
		// })

		// test("Invalid track", async () => {
		// 	let newErr
		// 	let hike = {
		// 		title: "Title", length: 10, expectedTime: 10, ascent: 10,
		// 		difficulty: 'Tourist', description: "Description",
		// 		country: 'Italy', municipality: "Torino", province: "Torino",
		// 		creatorID: 4,
		//		track: 'invalid'
		// 	}
		// 	await hikeController.addHike(hike)
		// 		.catch(err => newErr = err)

		// 	let newHike = await getHike(1);

		// 	expect(newErr).not.toBe(null)
		// 	expect(newErr).not.toBe(undefined)
		// 	expect(newHike).toBeUndefined();
		// })

		test("Valid Hike", async () => {
			let newErr;
			let hike = {
				title: "Title", length: 10, expectedTime: 10, ascent: 10,
				difficulty: "Tourist", description: "Description",
				municipality: "Torino", province: "Torino",
				country: 'Italy', municipality: "Torino", province: "Torino",
				creatorID: 4,
				track: [[45.95929, 8.44804], [45.95929, 8.44804], [45.95927, 8.44812], [45.95924, 8.44814]]
			}

			await hikeController.addHike(hike)
				.catch(err => newErr = err);

			let newHike = await getHike(1);
			let track = await getTrack(1);

			expect(newErr).toBeUndefined();
			expect(newHike.title).toMatch(hike.title);
			expect(newHike.length).toEqual(hike.length);
			expect(newHike.expectedTime).toEqual(hike.expectedTime);
			expect(newHike.ascent).toEqual(hike.ascent);
			expect(newHike.difficulty).toMatch(hike.difficulty);
			expect(newHike.description).toMatch(hike.description);
			expect(newHike.country).toMatch(hike.country);
			expect(newHike.municipality).toMatch(hike.municipality);
			expect(newHike.province).toMatch(hike.province);
			expect(newHike.creatorID).toEqual(hike.creatorID);
			expect(track).toEqual(hike.track);
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
			let newErr;

			await newHike(1);
			await newHike(2);

			let hikes = await hikeController.getAllHikes()
				.catch(err => newErr = err);

			expect(newErr).toBeUndefined();
			expect(hikes.length).toBe(2);
			expect(hikes[0].hikeID).toBe(1);
			expect(hikes[1].hikeID).toBe(2);
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
			let newErr;

			await newHike(1);

			let hike = await hikeController.getHike(1)
				.catch(err => newErr = err);

			expect(newErr).toBeUndefined();
			expect(hike.hikeID).toBe(1);
		});
	});

	describe("Delete hike", () => {
		test('Delete hike with invalid hikeID', async () => {
			let newErr;

			await newHike(1);

			await hikeController.deleteHike('invalid')
				.catch(err => newErr = err);

			let hikes = await getHikes();

			expect(newErr).not.toBeUndefined();
			expect(hikes.length).toBe(1);
		});

		test('Delete non existing hike', async () => {
			let newErr;

			await newHike(1);

			await hikeController.deleteHike(2)
				.catch(err => newErr = err);

			let hikes = await getHikes();

			expect(hikes.length).toBe(1);
		});

		test('Delete existing hike', async () => {
			let newErr;

			await newHike(1);
			await newHike(2);

			await hikeController.deleteHike(1)
				.catch(err => newErr = err);

			let hikes = await getHikes();

			expect(newErr).toBeUndefined();
			expect(hikes.length).toBe(1);
			expect(hikes[0].hikeID).toBe(2);
		});
	});

	describe("Link start point to hike", () => {

	})

	describe("Link end point to hike", () => {

	})

	describe("Link reference points to hike", () => {
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

	// describe("Get huts close to an hike", () => {
	// 	test("Valid hikeID", async () => {
	// 		let caughtError;

	// 		await Utils.newHike(1);

	// 		let huts = await hikeController.getCloseHutsForHike(1)
	// 			.catch(err => caughtError = err);

	// 		expect(caughtError).toBe(undefined);
	// 		expect(huts).not.toBe(null);
	// 	})
	// 	test("Invalid hikeID", async () => {
	// 		let caughtError;
	// 		let huts = await hikeController.getCloseHutsForHike("invalid")
	// 			.catch(err => caughtError = err);

	// 		expect(caughtError).not.toBe(undefined);
	// 	})
	// })

	// describe("Link a hut to an hike", () => {
	// 	test("Valid hutID to valid hikeID", async () => {
	// 		let caughtError;

	// 		await Utils.newHike(1);

	// 		let newLink = await hikeController.linkHutToHike(1, 1)
	// 			.catch(err => caughtError = err);

	// 		expect(caughtError).toBe(undefined);
	// 		expect(newLink).not.toBe(null);
	// 		expect(newLink.hutID).toBe(1);
	// 		expect(newLink.hikeID).toBe(1);
	// 	})

	// 	test("Invalid hutID to valid hikeID", async () => {
	// 		let caughtError;
	// 		let newLink = await hikeController.linkHutToHike("invalid", 1)
	// 			.catch(err => caughtError = err);

	// 		expect(caughtError).not.toBe(undefined);
	// 	})

	// 	test("Valid hutID to invalid hikeID", async () => {
	// 		let caughtError;
	// 		let newLink = await hikeController.linkHutToHike(1, "invalid")
	// 			.catch(err => caughtError = err);

	// 		expect(caughtError).not.toBe(undefined);
	// 	})
	// })

	// describe("Remove hut-hike link", () => {
	// 	test("Valid hutID to valid hikeID", async () => {
	// 		let caughtError;
	// 		let newLink = await hikeController.linkHutToHike(1, 1)
	// 			.catch(err => caughtError = err);
	// 		let deletedLink = await hikeController.deleteHutToHikeLink(1, 1)
	// 			.catch(err => caughtError = err);

	// 		expect(caughtError).toBe(undefined);
	// 		expect(deletedLink).not.toBe(null);
	// 		expect(deletedLink.hutID).toBe(1);
	// 		expect(deletedLink.hikeID).toBe(1);
	// 	})

	// 	test("Invalid hutID to valid hikeID", async () => {
	// 		let caughtError;
	// 		let newLink = await hikeController.linkHutToHike(1, 1)
	// 			.catch(err => caughtError = err);
	// 		let deletedLink = await hikeController.deleteHutToHikeLink("invalid", 1)
	// 			.catch(err => caughtError = err);

	// 		expect(caughtError).not.toBe(undefined);
	// 	})

	// 	test("Valid hutID to invalid hikeID", async () => {
	// 		let caughtError;
	// 		let newLink = await hikeController.linkHutToHike(1, 1)
	// 			.catch(err => caughtError = err);
	// 		let deletedLink = await hikeController.deleteHutToHikeLink(1, "1")
	// 			.catch(err => caughtError = err);

	// 		expect(caughtError).not.toBe(undefined);
	// 	})
	// })
});

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

function getTrack(hikeId) {
	let file = path.resolve(__dirname + `/../database/tracks/_${hikeId}_.trk`);

	return JSON.parse(readFileSync(file, { encoding: 'utf8', flag: 'r' }));
}

function newHike(hikeId) {
	return new Promise((resolve, reject) => {
		let sql = 'INSERT INTO Hike(hikeID, creatorID) VALUES(?, 5)';
		let track = [[45.95929, 8.44804], [45.95929, 8.44804], [45.95927, 8.44812], [45.95924, 8.44814]];

		db.run(sql, [hikeId], err => {
			let file = path.resolve(__dirname + `/../database/tracks/_${hikeId}_.trk`);

			writeFile(file, JSON.stringify(track), { flag: 'w', encoding: 'utf8' }, () => { });

			resolve();
		});
	});
}