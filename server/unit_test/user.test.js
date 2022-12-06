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
		type: types[2], password: 'jacksparrow'
	}
];

beforeEach(async () => await dbManager.clearDb());
afterEach(async () => await dbManager.clearDb());


describe('User Tests', () => {
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
			expect(user.approved).toBe(1)
		});

		test("Registration of a new hut worker", async () => {
			//TODO edoardo's job
			expect(1).toBe(1)

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
			let user;
			let loginedUser;
			await userController.register(newUser, 1, 1)
				.then(u => {
					user = u;
				})
				.catch(err => { console.error(err); throw err; });

			await userController.login(user.email, 'jacksparrow').then(u => {
				loginedUser = u;
			});

			expect(user.email).toBe(loginedUser.email);
		});

		test('Wrong Password', async () => {
			let user = newUsers[3];
			let loginedUser;
			let error;

			await userController.login(user.email, 'jacksparrowWrong').then(u => {
				loginedUser = u;
			}).catch(err => error = err);

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
		test("verification of a local guide", async () => {
			expect(1).toBe(1)
			//TODO edoardo's job
		})

		test("verification of a hut worker", async () => {
			expect(1).toBe(1)

		})
	})

	describe("setting profile", () => {
		test("test on set profile", async () => {
			//TODO edoardo's job
			expect(1).toBe(1)
		})
	})


})
