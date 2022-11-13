const crypto = require("crypto");

const dbManager = require("../database/DBManagerSingleton").getTestInstance();
const db = dbManager.getDB();
const { Register } = require("../DAO/UserDAO");

const User = require("../Class/User");

const types = ['hiker', 'friend'];

describe('Registration Tests', () => {
	let lastId = 0;
	let users = [
		{ id: ++lastId, name: 'mario', surname: 'rossi', email: 'mario.rossi@ex.com', phoneNumber: '0123456789', type: types[0], password: 'pretest1' }
		//Other precomputed users
	];
	let newUsers = [
		{ name: 'marco', surname: 'verdi', email: 'marco.verdi@ex.com', phoneNumber: '1111111111', type: types[0], password: 'test1' },
		{ name: 'matteo', surname: 'marroni', email: 'matteo.marroni@ex.com', phoneNumber: '2222222222', type: types[0], password: 'test2' }
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

		let user = await Register(newUser.name, newUser.surname, newUser.email, newUser.phoneNumber, newUser.type, newUser.password)
			.then(u => {
				newId++;
				return u;
			})
			.catch(err => { return err; });

		let res = await new Promise((resolve, reject) => {
			let sql = 'SELECT * FROM User WHERE userId = ?';

			db.get(sql, [lastId + 1], (err, row) => {
				if (err) reject(err);
				else if (row == undefined) reject('no results');
				else resolve(row);
			});
		}).then(u => new Promise((resolve, reject) =>
			crypto.scrypt(newUser.password, Buffer.from(u.salt, 'base64'), 32, (err, hashedPassword) => {
				if (err) reject(err);
				else resolve({
					id: u.userID,
					name: u.name,
					surname: u.surname,
					email: u.email,
					pn: u.phoneNumber,
					type: u.type,
					pwd: hashedPassword.toString('base64') == u.hashedPassword
				});
			})
		)).catch(err => {return false; });

		expect(user).not.toBeUndefined();
		expect(user instanceof User).toBe(true);
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
		expect(user).toBe('user exists');

		expect(res).not.toBeUndefined();
		expect(res).toBe(1);
	});
}