const { db } = require("../database/dbManager");
const crypto = require("crypto");

const User = require("../Class/User");

function CheckExisting(email, phoneNumber) {
	return new Promise((resolve, reject) => {
		let sql = "SELECT COUNT(*) as N FROM User WHERE email = ? OR phoneNumber = ?";

		db.get(sql, [email, phoneNumber], (row, err) => {
			if (err) reject();
			else if (row.N == 0) resolve();
			else reject();
		})
	})
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

exports.getUserById = (id) => {
	return new Promise((resolve, reject) => {
		const sql = 'SELECT * FROM USER WHERE userID=?';
		db.get(sql, [id], (err, row) => {
			if (err)
				reject(err);
			else if (row === undefined)
				resolve({ error: 'User not found' });
			else {
				const user = { userID: row.userID, name: row.name, surname: row.surname, phoneNumber: row.phoneNumber, type: row.type }
				resolve(user);
			}
		});
	});
};

exports.getUser = (email, password) => {
	return new Promise((resolve, reject) => {
		const sql = 'SELECT * FROM USER WHERE email = ?';
		db.get(sql, [email], (err, row) => {
			if (err) { reject(err); }
			else if (row === undefined) { resolve(false); }
			else {
				const user = { userID: row.userID, name: row.name, surname: row.surname, phoneNumber: row.phoneNumber, type: row.type };

				const salt = row.salt;
				crypto.scrypt(password, salt, 32, (err, hashedPassword) => {
					if (err) reject(err);
					const passwordHex = Buffer.from(row.hash, 'hex');
					if (!crypto.timingSafeEqual(passwordHex, hashedPassword))
						resolve(false);
					else resolve(user);
				});
			}
		});
	});
};

/**
 * Registers new user (friend or hiker) if it's not already present in the datatbase
 * 
 * @param {string} name 
 * @param {string} surname 
 * @param {string} email 
 * @param {number} phoneNumber 
 * @param {string} type 
 * @param {string} password 
 * @returns User object
 */
exports.Register = (name, surname, email, phoneNumber, type, password) =>
	CheckExisting(email, phoneNumber).then(() =>

		EncryptPassword(password)).then((pass) =>

			new Promise((resolve, reject) => {
				let sql = "INSERT INTO User(NAME, SURNAME, EMAIL, PHONENUMBER, TYPE, SALT, HASHEDPASSWORD) VALUES(?, ?, ?, ?, ?, ?, ?)";

				db.run(sql, [name, surname, email, phoneNumber, type, pass.salt, pass.hashedPassword], function (err) {
					if (err) reject();
					else resolve(new User(this.lastID, name, surname, email, phoneNumber, type));
				})
			}))