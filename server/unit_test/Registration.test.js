const crypto = require("crypto");

const { db, start, populateUser } = require("../database/TestDB");
const { Register } = require("../DAO/UserDAO");
const User = require("../Class/User");

const types = ['hiker', 'friend']

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

	beforeAll(async () => await populateUser(users));

	//testExistingUser(users);

	lastId = testRegistration(lastId, newUsers);

	//other constraints
});

function testExistingUser(users) {
	test('Register existing user', () => {
		let user = users[0];

		Register(user.name, user.surname, user.email, user.pn, user.type, user.pwd, db)
			//.then(res => expect(res).toBeUndefined())
			.catch(err => expect(err).toBe('user exists'));
	});
}

function testRegistration(lastId, users) {
	let newId = lastId;

	test('Register new user', async () => {
		let user = users[0];

		Register(user.name, user.surname, user.email, user.pn, user.type, user.pwd, db)
			.then(res => {
				newId++;

				expect(res instanceof User).toBe(true);
				expect(res.userID).toBe(newId);
				expect(res.name).toBe(user.name);
				expect(res.surname).toBe(user.surname);
				expect(res.email).toBe(user.email);
				expect(res.phoneNumber).toBe(user.pn);
				expect(res.type).toBe(user.type);

				new Promise((resolve, reject) => {
					let sql = 'SELECT salt, hashedpassword FROM User WHERE UserId = ?';

					db.get(sql, [newId], (err, row) => {
						if (err) reject(err);
						else resolve({ salt: row.SALT, hp: row.HASHEDPASSWORD });
					});
				})
					.then(sp =>
						new Promise((resolve, reject) =>
							crypto.scrypt(user.pwd, sp.salt, 32, (err, hashedPassword) => {
								if (err) reject(err);
								else resolve(hashedPassword === sp.hp);
							})
						)
					)
					.then(hpwd => expect(hpwd).toBe(true))
					.catch(err => expect(err).toBeUndefined());
			})
			.catch(err => expect(err).toBeUndefined());
	});

	return newId;
}