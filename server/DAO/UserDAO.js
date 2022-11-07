const { db } = require("./dbManager");
const crypto = require("crypto");

function CheckExisting(email, phonenumber) {
	return new Promise((resolve, reject) =>
		db.get(sql, [], (row, err) => {
			if (err) reject();
			else if (row.N == 0) reject();
			else resolve();
		})
	)
}

function EncryptPassword(password) {
	return new Promise((resolve, reject) => {
		let salt = crypto.randomBytes(16);

		crypto.scrypt(password, salt, 32, (err, hashedPassword) => {
			if (err) reject(err);
			else {
				pass.password = hashedPassword.toString('base64');
				pass.salt = salt.toString('base64');

				resolve({
					salt: salt.toString('base64'),
					hashedPassword: hashedPassword.toString('base64')
				});
			}
		})
	})
}

exports.Register = (name, surname, email, phoneNumber, type, password) => CheckExisting(email, phoneNumber)
	.then(() => EncryptPassword(password))
	.then((pass) => new Promise((resolve, reject) => {
		let sql = "INSERT INTO User(NAME, SURNAME, EMAIL, PHONENUMBER, TYPE, SALT, HASHEDPASSWORD) VALUES(?, ?, ?, ?, ?, ?, ?);"

		db.run(sql, [name, surname, email, phoneNumber, type, pass.salt, pass.hashedPassword], err => {
			if (err) reject();
			else resolve();
		})
	}))