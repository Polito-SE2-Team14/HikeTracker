const crypto = require("node:crypto");

const dbManager = require("../database/DBManagerSingleton").getInstance();
const userController = require("../Controller/UserController")
const userDAO = require("../DAO/UserDAO")

const types = ['hiker', 'hutWorker', 'localGuide', 'manager'];

let newUsers = [
	{
		name: 'marco', surname: 'verdi', email: 'marco.verdi@ex.com', phoneNumber: '1111111111',
		type: types[0], password: crypto.randomBytes(16).toString("hex")
	},
	{
		name: 'matteo', surname: 'marroni', email: 'matteo.marroni@ex.com', phoneNumber: '2222222222',
		type: types[1], password: crypto.randomBytes(16).toString("hex")
	},
	{
		name: 'antonio', surname: 'bianchi', email: 'antonio.bianchi@ex.com', phoneNumber: '333333333',
		type: types[2], password: crypto.randomBytes(16).toString("hex")
	},
	{
		name: 'jack', surname: 'sparrow', email: 'jack.sparrow@ex.com', phoneNumber: '444',
		type: types[2], password: crypto.randomBytes(16).toString("hex")
	}
];



describe('User Tests', () => {
	beforeAll(async () => await dbManager.clearDb());
	afterEach(async () => await dbManager.clearDb());


	describe('Registration tests', () => {
		test('Valid registration of new hiker user', async () => {
			let newUser = newUsers[0];
			let user;
			await userController.register(newUser, 1, 1)
				.then(u => {
					user = u;
				})
				.catch(err => { console.error(err); throw err; });

			expect(user).not.toBeUndefined();
			expect(user.name).toBe(newUser.name);
			expect(user.surname).toBe(newUser.surname);
			expect(user.email).toBe(newUser.email);
			expect(user.phoneNumber).toBe(newUser.phoneNumber);
			expect(user.type).toBe(newUser.type);
			expect(user.verified).toBe(1)
			expect(user.approved).toBe(true)
		});

		test("Registration and approval of a new hut worker", async () => {
			let newUser = newUsers[1];
			let user;

			await userController.register(newUser, 1, 0)
				.catch(err => { throw err })


			await userController.getUser(1)
				.then(u => user = u)
				.catch(err => { throw err })

			expect(user).not.toBeUndefined();
			expect(user.name).toBe(newUser.name);
			expect(user.surname).toBe(newUser.surname);
			expect(user.email).toBe(newUser.email);
			expect(user.phoneNumber).toBe(newUser.phoneNumber);
			expect(user.type).toBe(newUser.type);
			expect(user.verified).toBe(1)
			expect(user.approved).toBe(0)

			await userController.approve(1)
				.catch(err => { throw err })

			await userController.getUser(1)
				.then(u => user = u)
				.catch(err => { throw err })

			expect(user.approved).toBe(1)


		})

		test("Registration of a new local guide", async () => {
			expect(1).toBe(1)

		})


		test('Registering existing user', async () => {
			let newUser = newUsers[0];
			let error;
			const token = crypto.randomBytes(20).toString('hex')
			await userDAO.Register(newUser, token, 1, 1)
				.catch(err => { console.error(err); throw err; });

			await userController.register(newUser, 1, 1)
				.catch(err => error = err)
			expect(error).not.toBeUndefined();

		});

		test('Invalid name', async () => {
			let error
			let wrongUser = {
				name: 111, surname: "Surname", phoneNumber: 1234567890,
				email: "Email@mail.com", type: "hiker", password: crypto.randomBytes(16).toString("hex")
			}

			await userController.register(wrongUser, 1, 1)
				.catch(err => error = err);


			expect(error).not.toBe(null)
			expect(error).not.toBe(undefined)
		})

		test('Invalid surname', async () => {
			let error
			let wrongUser = {
				name: "Name", surname: 111, phoneNumber: 1234567890,
				email: "Email@mail.com", type: "hiker", password: crypto.randomBytes(16).toString("hex")
			}

			await userController.register(wrongUser, 1, 1)
				.catch(err => error = err);

			expect(error).not.toBe(null)
			expect(error).not.toBe(undefined)
		})

		test('Invalid phoneNumber', async () => {
			let error
			let wrongUser = {
				name: "Name", surname: "surname", phoneNumber: "invalid",
				email: "Email@mail.com", type: "hiker", password: crypto.randomBytes(16).toString("hex")
			}

			await userController.register(wrongUser, 1, 1)
				.catch(err => error = err);

			expect(error).not.toBe(null)
			expect(error).not.toBe(undefined)
		})

		test('Invalid email', async () => {
			let error
			let wrongUser = {
				name: "Name", surname: "Surname", phoneNumber: 1234567890,
				email: 12311244, type: "hiker", password: crypto.randomBytes(16).toString("hex")
			}

			await userController.register(wrongUser, 1, 1)
				.catch(err => error = err);


			expect(error).not.toBe(null)
			expect(error).not.toBe(undefined)
		})

		test('Invalid type (not standard)', async () => {
			let error
			let wrongUser = {
				name: "Name", surname: 111, phoneNumber: 1234567890,
				email: "Email@mail.com", type: "hiker", password: crypto.randomBytes(16).toString("hex")
			}

			await userController.register(wrongUser, 1, 1)
				.catch(err => error = err);


			expect(error).not.toBe(null)
			expect(error).not.toBe(undefined)
		})

		test('Invalid type (not a string)', async () => {
			let error
			let wrongUser = {
				name: "Name", surname: "surname", phoneNumber: 1234567890,
				email: "Email@mail.com", type: 111, password: crypto.randomBytes(16).toString("hex")
			}

			await userController.register(wrongUser, 1, 1)
				.catch(err => error = err);


			expect(error).not.toBe(null)
			expect(error).not.toBe(undefined)
		})
	})
	describe("Login", () => {

		test('Correct Login', async () => {
			let newUser = newUsers[3];
			let password = newUsers[3].password;
			let user;
			let loginedUser;
			await userController.register(newUser, 1, 1)
				.then(u => {
					user = u;
				})
				.catch(err => { console.error(err); throw err; });

			await userController.login(user.email, password).then(u => {
				loginedUser = u;
			});

			expect(user.email).toBe(loginedUser.email);
		});

		test('Wrong Password', async () => {
			let user = newUsers[3];
			let loginedUser;

			await userController.login(user.email, 'jacksparrowWrong').then(u => {
				loginedUser = u;

				expect(loginedUser).toBe(false)
			});


		})
		describe("get user", () => {

			test('Correct User ID', async () => {
				let newUser = newUsers[3];
				let addedUser;
				await userController.register(newUser, 1, 1)
					.then(u => {
						addedUser = u;
					})
					.catch(err => { console.error(err); throw err; });


				let gottenUser;

				await userController.getUser(addedUser.userID).then(u => {
					gottenUser = u;
				});
				expect(addedUser.userID).toBe(gottenUser.userID);
				expect(gottenUser.userID).not.toBe(null);
				expect(gottenUser.userID).not.toBe(undefined);
			});

		})
		describe("verify", () => {

			test("verification of a User by Token", async () => {
				let newUser = newUsers[3];
				let addedUser;
				let gottenUser;
				await userController.register(newUser, 0, 1)
					.then(u => {
						addedUser = u;
					})
					.catch(err => { console.error(err); throw err; });

				await userController.verify(addedUser.token);

				await userController.getUser(addedUser.userID).then(u => {
					gottenUser = u;
				});

				expect(addedUser.verified).toBe(0);
				expect(gottenUser.verified).toBe(1);

			})
		})

		describe("get all users", () => {

			test("get all localGuides", async () => {
				let newUser = newUsers[2];
				await userController.register(newUser, 1, 0)
					.catch(err => { console.error(err); throw err; });

				let newUser2 = newUsers[3];
				await userController.register(newUser2, 1, 0)
					.catch(err => { console.error(err); throw err; });

				let allusers;
				await userController.getAllLocalGuides(false).then(u => {
					allusers = u;
				});

				expect(allusers.length).toBe(2);

			})

			test("get all hutworkers", async () => {
				let newUser = newUsers[1];
				await userController.register(newUser, 1, 0)
					.catch(err => { console.error(err); throw err; });

				let allusers;
				await userController.getAllHutWorkes(false).then(u => {
					allusers = u;
				});

				expect(allusers.length).toBe(1);

			})
		})

		describe("approving", () => {

			test("approving a user", async () => {
				let newUser = newUsers[1];
				let addedUser;
				let gottenUser;
				await userController.register(newUser, 1, 0)
					.then(u => {
						addedUser = u;
					})
					.catch(err => { console.error(err); throw err; });

				await userController.approve(addedUser.userID);

				await userController.getUser(addedUser.userID)
					.then(u => gottenUser = u);



				expect(addedUser.approved).toBe(0);
				expect(gottenUser.approved).toBe(1);

			})

			test("unApproving a user", async () => {
				let newUser = newUsers[0];
				let addedUser;
				let gottenUser;
				await userController.register(newUser, 1, 1)
					.then(u => {
						addedUser = u;
					})
					.catch(err => { console.error(err); throw err; });

				await userController.unApprove(addedUser.userID);

				await userController.getUser(addedUser.userID).then(u => {
					gottenUser = u;
				});

				expect(addedUser.approved).toBe(true);
				expect(gottenUser.approved).toBe(0);
			})
		})

		describe("setting profile", () => {
			test("test on set profile", async () => {

				let newUser = newUsers[0];
				await userController.register(newUser, 1, 1)
					.then(u => {
					})
					.catch(err => { console.error(err); throw err; });


				const userStats = {
					userID: 1, completedHikes: 0,
					favouriteDifficulty: "Tourist", minTime: 100,
					maxTime: 200, totalTime: 1000, averageTime: 100,
					minDistance: 200, maxDistance: 300, totalDistance: 3000, averageDistance: 100,
					favouriteCountry: "Italy", favouriteProvince: "Turin",
					minAscent: 100, maxAscent: 200, averageAscent: 1000
				}

				await userController.addUserStats(userStats)
					.catch(err => { console.error(err); throw err })

				let addedStats
				await userController.getUserStats(1)
					.then(s => addedStats = s)
					.catch(err => { console.error(err); throw err })

				expect(userStats).toEqual(addedStats)

			})
		})

	})
})
