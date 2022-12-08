const hikeController = require("../Controller/HikeController")
const userController = require("../Controller/UserController")
const hutController = require("../Controller/HutController")
const pointController = require("../Controller/PointController")

const path = require('path');
const { writeFile } = require('fs');
const crypto = require("crypto");
const { user } = require("../Config/nodemailer.config");
const dbManager = require("../database/DBManagerSingleton").getInstance()
const db = dbManager.getDB();
// const populationFunctions = require("../database/populationFunctions")

beforeEach(async () => await dbManager.clearDb());
afterAll(async () => await dbManager.clearDb());

describe('Hike Tests', () => {
	describe("creation of new Hike", () => {

		test("Valid creation", async () => {

			let user
			await userController.register({
				name: 'matteo', surname: 'marroni', email: 'matteo.marroni@ex.com', phoneNumber: '2222222222',
				type: "localGuide", password: crypto.randomBytes(16).toString("hex")
			}, 1, 1)
				.then(u => {
					user = u;
				})
				.catch(err => { console.error(err); throw err; });

			let newErr
			let hike = {
				title: "title", length: 10, expectedTime: 10, ascent: 10,
				difficulty: "Hiker", description: "Description", country: "Italy",
				municipality: "Torino", province: "Torino", track: [[10, 10], [11, 11]], creatorID: user.userID
			}
			await hikeController.addHike(hike)
				.catch(err => newErr = err)

			let createdHike
			await hikeController.getAllHikes()
				.then(h => createdHike = h[0])

			let createdHike2
			await hikeController.getHike(createdHike.hikeID)
				.then(h => createdHike2 = h)

			expect(hike.title).toBe(createdHike.title)
			expect(hike.length).toBe(createdHike.length)
			expect(hike.expectedTime).toBe(createdHike.expectedTime)
			expect(hike.ascent).toBe(createdHike.ascent)
			expect(hike.difficulty).toBe(createdHike.difficulty)
			expect(hike.description).toBe(createdHike.description)
			expect(hike.country).toBe(createdHike.country)
			expect(hike.municipality).toBe(createdHike.municipality)
			expect(hike.province).toBe(createdHike.province)
			expect(hike.creatorID).toBe(createdHike.creatorID)
			expect(user.name).toBe(createdHike.creatorName)
			expect(user.surname).toBe(createdHike.creatorSurname)

			expect(hike.title).toBe(createdHike2.title)
			expect(hike.length).toBe(createdHike2.length)
			expect(hike.expectedTime).toBe(createdHike2.expectedTime)
			expect(hike.ascent).toBe(createdHike2.ascent)
			expect(hike.difficulty).toBe(createdHike2.difficulty)
			expect(hike.description).toBe(createdHike2.description)
			expect(hike.country).toBe(createdHike2.country)
			expect(hike.municipality).toBe(createdHike2.municipality)
			expect(hike.province).toBe(createdHike2.province)
			expect(hike.creatorID).toBe(createdHike2.creatorID)



		})


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
	})

	describe("Getting hikes", () => {
		test('Get hikes list empty', async () => {
			let newErr;

			let hikes = await hikeController.getAllHikes()
				.catch(err => newErr = err);

			expect(newErr).toBeUndefined();
			expect(hikes.length).toBe(0);
		});

		// test('Get hikes list not empty', async () => {
		// 	let newErr;

		// 	await newHike(1);
		// 	await newHike(2);

		// 	let hikes = await hikeController.getAllHikes()
		// 		.catch(err => newErr = err);

		// 	expect(newErr).toBeUndefined();
		// 	expect(hikes.length).toBe(2);
		// 	expect(hikes[0].hikeID).toBe(1);
		// 	expect(hikes[1].hikeID).toBe(2);
		// });

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

		// test('Get existing hike', async () => {
		// 	let newErr;

		// 	await newHike(1);

		// 	let hike = await hikeController.getHike(1)
		// 		.catch(err => newErr = err);

		// 	expect(newErr).toBeUndefined();
		// 	expect(hike.hikeID).toBe(1);
		// });
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

	describe("link start", () => {
		test("Valid hike and start point", async () => {
			let caughtError;
			await hikeController.setStart(1, 1)
				.catch(err => caughtError = err);
			expect(caughtError).toBe(undefined);
		})
		test("Invalid hike, valid start point", async () => {
			let caughtError;
			await hikeController.setStart("hike1", 1)
				.catch(err => caughtError = err);
			expect(caughtError).not.toBe(undefined);
		})
		test("Valid hike, invalid start point", async () => {
			let caughtError;
			await hikeController.setStart(1, "point1")
				.catch(err => caughtError = err);
			expect(caughtError).not.toBe(undefined);
		})
	})
	describe("link end", () => {
		test("Valid hike and start point", async () => {
			let caughtError;
			await hikeController.setEnd(1, 2)
				.catch(err => caughtError = err);
			expect(caughtError).toBe(undefined);
		})
		test("Invalid hike, valid start point", async () => {
			let caughtError;
			await hikeController.setEnd("hike1", 2)
				.catch(err => caughtError = err);
			expect(caughtError).not.toBe(undefined);
		})
		test("Valid hike, invalid start point", async () => {
			let caughtError;
			await hikeController.setEnd(1, "point2")
				.catch(err => caughtError = err);
			expect(caughtError).not.toBe(undefined);
		})
	})
	describe("reference points", () => {
		test("successful creation of reference points", async () => {
			let user
			await userController.register({
				name: 'matteo', surname: 'marroni', email: 'matteo.marroni@ex.com', phoneNumber: '2222222222',
				type: "localGuide", password: crypto.randomBytes(16).toString("hex")
			}, 1, 1)
				.then(u => {
					user = u;
				})
				.catch(err => { console.error(err); throw err; });


			let hike = {
				title: "title", length: 10, expectedTime: 10, ascent: 10,
				difficulty: "Hiker", description: "Description", country: "Italy",
				municipality: "Torino", province: "Torino", track: [[10, 10], [11, 11]], creatorID: user.userID
			}

			let addedHike
			await hikeController.addHike(hike)
				.then(h => addedHike = h)
				.catch(err => { console.error(err); throw err; });


			let referencePoint = {
				name: "Nome del reference point",
				description: "Descrizione del reference point",
				latitude: 123,
				longitude: 456,
				altitude: 789,
				municipality: "municipality",
				province: "province",
				country: "country",
				creatorID: user.userID,
				type: "generic",
			}
			let referencePointID;

			await hikeController.addReferencePoint(addedHike.hikeID, referencePoint)
				.then(id => referencePointID = id)
				.catch(err => { console.error(err); throw err })


			await hikeController.getReferencePointsForHike(addedHike.hikeID)
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
	/* describe("delete an hike", () => {
		 test("successful remove of an hike", async () => {
			let hike = {
				title: "title", length: 10, expectedTime: 10, ascent: 10,
				difficulty: "Hiker", description: "Description", country: "Italy",
				municipality: "Torino", province: "Torino", track: [[10, 10], [11, 11]], creatorID: user.userID
			}
			await hikeController.addHike(hike)
				.catch(err => newErr = err)

			let askedHike
			await hikeController.getHike(1)
				.then(h => askedHike = h)

			await hikeController.deleteHike(1)

			await hikeController.getHike(1)
				.then(h => askedHike = h)

			expect(askedHike).toBe(null)
		})
	}) */
	describe("Get huts close to an hike", () => {
		test("Valid hikeID", async () => {
			let caughtError;
			let huts = await hikeController.getCloseHutsForHike(1)
				.catch(err => caughtError = err);
			expect(caughtError).toBe(undefined);
			expect(huts).not.toBe(null);
		})
		test("Invalid hikeID", async () => {
			let caughtError;
			let huts = await hikeController.getCloseHutsForHike('hike1')
				.catch(err => {
					//console.log(err);
					caughtError = err;
				});
			expect(caughtError).not.toBe(undefined);
		})
	})
	describe("Link a hut to an hike", () => {
		test("Valid hutID to valid hikeID", async () => {

			/* await userController.register({
				name: 'matteo', surname: 'marroni', email: 'matteo.marroni@ex.com', phoneNumber: '2222222222',
				type: "localGuide", password: crypto.randomBytes(16).toString("hex")
			}, 1, 1)
				.then(u => {
					user = u;
				})
				.catch(err => { console.error(err); throw err; });

			let hut
			await hutController.createHut(
				{
					pointID: 0, name: "nameTest", latitude: 392131, longitude: 12931, municipality: "Moncalieri", province: "Turin",
					address: "addressTest", bedspace: 5, creatorID: user.userID
				}
			)
				.then(h => hut = h)
			
			
			console.log(hut)
			
			let caughtError;
			let newLink=await hikeController.linkHutToHike(hut.pointID,1)
				.catch(err=>caughtError=err);
	
			expect(caughtError).toBe(undefined);
			expect(newLink).not.toBe(null);
			expect(newLink.hutID).toBe(1);
			expect(newLink.hikeID).toBe(1); */
			expect(1).toBe(1)
		})

		test("Invalid hutID to valid hikeID", async () => {
			let caughtError;
			let newLink = await hikeController.linkHutToHike("hut1", 1)
				.catch(err => caughtError = err);

			expect(caughtError).not.toBe(undefined);
		})

		test("Valid hutID to invalid hikeID", async () => {
			let caughtError;
			let newLink = await hikeController.linkHutToHike(1, "hike1")
				.catch(err => caughtError = err);

			expect(caughtError).not.toBe(undefined);
		})
	})

	describe("Remove hut-hike link", () => {
		test("Valid hutID to valid hikeID", async () => {
			let caughtError;
			// let newLink=await hikeController.linkHutToHike(1,1)
			// 	.catch(err=>caughtError=err);
			let deletedLink = await hikeController.deleteHutToHikeLink(1, 1)
				.catch(err => caughtError = err);

			expect(caughtError).toBe(undefined);
			expect(deletedLink).not.toBe(null);
			expect(deletedLink.hutID).toBe(1);
			expect(deletedLink.hikeID).toBe(1);
		})

		test("Invalid hutID to valid hikeID", async () => {
			let caughtError;
			let deletedLink = await hikeController.deleteHutToHikeLink("hut1", 1)
				.catch(err => caughtError = err);

			expect(caughtError).not.toBe(undefined);
		})

		test("Valid hutID to invalid hikeID", async () => {
			let caughtError;
			let deletedLink = await hikeController.deleteHutToHikeLink(1, "hike1")
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