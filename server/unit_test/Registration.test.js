const crypto = require("crypto");

const dbManager = require("../database/DBManagerSingleton").getInstance();
const db = dbManager.getDB();
const { Register } = require("../DAO/UserDAO");
const userController = require("../Controller/UserController")


const types = ['hiker', 'friend'];

describe('Registration Tests', () => {
	let lastId = 0;
	let users = [
		{
			id: ++lastId, name: 'mario', surname: 'rossi', email: 'mario.rossi@ex.com',
			phoneNumber: '0123456789', type: types[0], password: crypto.randomBytes(16).toString("hex")
		}
		//Other precomputed users
	];
	let newUsers = [
		{
			name: 'marco', surname: 'verdi', email: 'marco.verdi@ex.com', phoneNumber: '1111111111',
			type: types[0], password: crypto.randomBytes(16).toString("hex")
		},
		{
			name: 'matteo', surname: 'marroni', email: 'matteo.marroni@ex.com', phoneNumber: '2222222222',
			type: types[0], password: crypto.randomBytes(16).toString("hex")
		}
		//Other test users
	];

	beforeAll(async () => await dbManager.populateUser(users));

	lastId = testCorrectRegistration(lastId, newUsers);

	testWrongRegistration(lastId, users);
});

function testCorrectRegistration(lastId, users) {
	let newId = lastId;

	test('Registering new user', async () => {
		let newUser = users[0];
		let user;
		await Register(newUser)
			.then(u => {
				newId++;
				user = u;
			})
			.catch(err => { console.error(err); throw err; });



		let res = await new Promise((resolve, reject) => {
			let sql = 'SELECT * FROM User WHERE userId = ?';

			db.get(sql, [lastId + 1], (err, row) => {
				if (err) reject(err);
				else if (row == undefined) reject('no results');
				else resolve(row);
			});
		}).then(u => new Promise((resolve, reject) =>
			crypto.scrypt(newUser.password, Buffer.from(u.salt, 'hex').toString("hex"), 16, (err, hashedPassword) => {
				if (err) reject(err);
				else resolve({
					id: u.userID,
					name: u.name,
					surname: u.surname,
					email: u.email,
					pn: u.phoneNumber,
					type: u.type,
					pwd: hashedPassword.toString('hex') == u.hashedPassword
				});
			})
		)).catch(err => { return false; });


		expect(user).not.toBeUndefined();
		expect(user.userID).toBe(lastId + 1);
		expect(user.name).toBe(newUser.name);
		expect(user.surname).toBe(newUser.surname);
		expect(user.email).toBe(newUser.email);
		expect(user.phoneNumber).toBe(newUser.phoneNumber);
		expect(user.type).toBe(newUser.type);
		expect(res).not.toBeUndefined();
		expect(res).not.toBe(false);
		expect(res.id).toBe(lastId + 1);
		expect(res.name).toBe(newUser.name);
		expect(res.surname).toBe(newUser.surname);
		expect(res.email).toBe(newUser.email);
		expect(res.pn).toBe(newUser.phoneNumber);
		expect(res.type).toBe(newUser.type);
		expect(res.pwd).toBe(true);
	});

	return newId;
}

function testWrongRegistration(lastId, users) {
	test('Registering existing user', async () => {
		let newUser = users[0];

		let user = await Register(newUser.name, newUser.surname, newUser.email, newUser.phoneNumber, newUser.type, newUser.password)
			.catch(err => { return err; });

		let res = await new Promise((resolve, reject) => {
			let sql = 'SELECT COUNT(*) as N FROM User WHERE userId = ?';

			db.get(sql, [lastId + 1], (err, row) => {
				if (err) reject(err);
				else if (row == undefined) reject('no results');
				else resolve(row.N);
			});
		}).catch(err => { return err; });

		expect(user).not.toBeUndefined();
		expect(res).not.toBeUndefined();
		expect(res).toBe(1);
	});

	test('Invalid name', async () => {
		let newErr
		let wrongUser = {
			name: 111, surname: "Surname", phoneNumber: 1234567890,
			email: "Email@mail.com", type: "hiker", password: crypto.randomBytes(16).toString("hex")
		}

		await userController.register(wrongUser)
			.catch(err => newErr = err);

		expect(newErr).not.toBe(null)
		expect(newErr).not.toBe(undefined)
	})

	test('Invalid surname', async () => {
		let newErr
		let wrongUser = {
			name: "Name", surname: 111, phoneNumber: 1234567890,
			email: "Email@mail.com", type: "hiker", password: crypto.randomBytes(16).toString("hex")
		}

		await userController.register(wrongUser)
			.catch(err => newErr = err);

		expect(newErr).not.toBe(null)
		expect(newErr).not.toBe(undefined)
	})

	test('Invalid phoneNumber', async () => {
		let newErr
		let wrongUser = {
			name: "Name", surname: "surname", phoneNumber: "invalid",
			email: "Email@mail.com", type: "hiker", password: crypto.randomBytes(16).toString("hex")
		}

		await userController.register(wrongUser)
			.catch(err => newErr = err);

		expect(newErr).not.toBe(null)
		expect(newErr).not.toBe(undefined)
	})

	test('Invalid email', async () => {
		let newErr
		let wrongUser = {
			name: "Name", surname: "Surname", phoneNumber: 1234567890,
			email: 12311244, type: "hiker", password: crypto.randomBytes(16).toString("hex")
		}

		await userController.register(wrongUser)
			.catch(err => newErr = err);

		expect(newErr).not.toBe(null)
		expect(newErr).not.toBe(undefined)
	})

	test('Invalid type (not standard)', async () => {
		let newErr
		let wrongUser = {
			name: "Name", surname: 111, phoneNumber: 1234567890,
			email: "Email@mail.com", type: "hiker", password: crypto.randomBytes(16).toString("hex")
		}

		await userController.register(wrongUser)
			.catch(err => newErr = err);

		expect(newErr).not.toBe(null)
		expect(newErr).not.toBe(undefined)
	})

	test('Invalid type (not a string)', async () => {
		let newErr
		let wrongUser = {
			name: "Name", surname: "surname", phoneNumber: 1234567890,
			email: "Email@mail.com", type: 111, password: crypto.randomBytes(16).toString("hex")
		}

		await userController.register(wrongUser)
			.catch(err => newErr = err);

		expect(newErr).not.toBe(null)
		expect(newErr).not.toBe(undefined)
	})
}