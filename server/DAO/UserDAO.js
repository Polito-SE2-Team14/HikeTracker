//const { db } = require("../database/dbManager");

const Singleton = require("../database/DBManagerSingleton")
const DBManager = require("../database/DBManager");
/** @type {DBManager} */
const dbManager = Singleton.getInstance();
const db = dbManager.getDB();

const crypto = require("crypto");

const User = require("../Class/User");

function CheckExisting(email, phoneNumber, DB = db) {
	return new Promise((resolve, reject) => {

		let sql = "SELECT COUNT(*) as N FROM User WHERE email = ? OR phoneNumber = ?";

		DB.get(sql, [email, phoneNumber], (err, row) => {

			if (err)
				reject(err);
			else if (row.N == 0)
				resolve();
			else reject("user exists");

		})
	})
}

function EncryptPassword(password) {
	return new Promise((resolve, reject) => {
		let salt = crypto.randomBytes(16);
		crypto.scrypt(password, salt, 32, (err, hashedPassword) => {
			if (err) reject(err);
			else {
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
 * @param {string} phoneNumber 
 * @param {string} type 
 * @param {string} password 
 * @returns User object
 */
exports.Register = (name, surname, email, phoneNumber, type, password, DB = db) =>
	CheckExisting(email, phoneNumber).then(() =>

		EncryptPassword(password)).then((pass) =>

			new Promise((resolve, reject) => {
				let sql = "INSERT INTO User(NAME, SURNAME, EMAIL, PHONENUMBER, TYPE, SALT, HASHEDPASSWORD) VALUES(?, ?, ?, ?, ?, ?, ?)";

				DB.run(sql, [name, surname, email, phoneNumber, type, pass.salt, pass.hashedPassword], function (err) {
					if (err) reject(err);
					else resolve(new User(this.lastID, name, surname, email, phoneNumber, type));
				})
			})
		);


