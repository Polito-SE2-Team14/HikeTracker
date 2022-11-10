const sqlite = require("sqlite3");
const crypto = require("crypto");

exports.db = new sqlite.Database('./database/test.sqlite', err => {
	if (err) throw err;
});

exports.start = () => {
	let db = this.db;
	let sql = [
		'CREATE TABLE IF NOT EXISTS User(USERID INTEGER PRIMARY KEY, NAME VARCHAR, SURNAME VARCHAR, EMAIL VARCHAR, PHONENUMBER VARCHAR, TYPE VARCHAR, SALT VARCHAR, HASHEDPASSWORD VARCHAR)'
		//Other tables
	];

	return Promise.all(sql.map(query =>
		new Promise((resolve, reject) =>
			db.run(query, err => {
				if (err) reject(err);
				else resolve();
			})
		)
	)).catch(err => { throw err });
};

exports.populateUser = (users) => {
	let db = this.db;
	let sql = 'INSERT INTO USER VALUES(?, ?, ?, ?, ?, ?, ?, ?)';

	return Promise.all(users.map(user =>
		new Promise((resolve, reject) => {
			let salt = crypto.randomBytes(16);

			crypto.scrypt(user.pwd, salt, 32, (err, hp) => {
				if (err) reject(err);
				else {
					user.salt = salt;
					user.pwd = hp;

					resolve(user);
				}
			});
		})
	)).then(res => Promise.all(res.map(user =>
		new Promise((resolve, reject) =>
			db.run(sql, [user.id, user.name, user.surname, user.email, user.pn, user.type, user.salt, user.pwd], err => {
				if (err) reject(err);
				else resolve();
			})
		)
	))).catch(err => { throw err });
};