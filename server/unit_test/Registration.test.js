const crypto = require("crypto");

const db = require("../database/DBManagerSingleton").getTestInstance();
const { Registration } = require("../DAO/UserDAO");

const User = require("../Class/User");

const types = ['hiker', 'friend'];

describe('Registration Tests', () => {
	let lastId = 0;
	let users = [
		{ id: ++lastId, name: 'mario', surname: 'rossi', email: 'mario.rossi@ex.com', pn: '0123456789', type: types[0], pwd: 'pretest1' }
		//Other precomputed users
	];
	let newUsers = [
		{ name: 'marco', surname: 'verdi', email: 'marco.verdi@ex.com', pn: '1111111111', type: types[0], pwd: 'test1' }
		//Other test users
	];

	beforeAll(async () => await db.populateUser(users));

	testExistingUser(users);

	lastId = testRegistration(lastId, newUsers);

	//other constraints
});

function testExistingUser(users) {
	test('Register existing user', async () => {
		let user = users[0];

		let res = await Registration.CheckExistingUser(user.email, user.pn);

		expect(res).toBe('user exists');
	});
}

function testRegistration(lastId, users) {
	let newId = lastId;

	test('Register new user', async () => {
		let user = users[0];

		let res = await Registration.Register(user.name, user.surname, user.email, user.pn, user.type, user.pwd, db)
			.then(u => {
				newId++;

				return u;
			}).catch(err => { return err; });

		let pwdCheck = await new Promise((resolve, reject) => {
			let sql = 'SELECT salt, hashedpassword FROM User WHERE UserId = ?';

			db.get(sql, [newId], (err, row) => {
				if (err) reject(err);
				else resolve({ salt: row.SALT, hp: row.HASHEDPASSWORD });
			});
		}).then(sp => new Promise((resolve, reject) =>
			crypto.scrypt(user.pwd, sp.salt, 32, (err, hashedPassword) => {
				if (err) reject(err);
				else resolve(hashedPassword.toString('base64') === sp.hp);
			})
		)).catch(err => { return err; })

		expect(newId).toBe(lastId + 1);
		expect(res).not.toBeUndefined();
		expect(res instanceof User).toBe(true);
		expect(res.userID).toBe(newId);
		expect(res.name).toBe(user.name);
		expect(res.surname).toBe(user.surname);
		expect(res.email).toBe(user.email);
		expect(res.phoneNumber).toBe(user.pn);
		expect(res.type).toBe(user.type);
		expect(pwdCheck).toBe(true);

	});

	return newId;
}