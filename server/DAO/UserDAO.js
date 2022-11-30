const crypto = require("crypto");

const Singleton = require("../database/DBManagerSingleton")
const DBManager = require("../database/DBManager");
/** @type {DBManager} */
const dbManager = Singleton.getInstance();
const db = dbManager.getDB();

function CheckExistingUser(email, phoneNumber) {
	return new Promise((resolve, reject) => {
		let sql = "SELECT COUNT(*) as N FROM User WHERE email = ? OR phoneNumber = ?";

		db.get(sql, [email, phoneNumber], (err, row) => {
			if (err) reject(err);
			else if (row.N == 0) resolve(true);
			else reject("user exists");
		});
	});
}

function EncryptPassword(password) {
	return new Promise((resolve, reject) => {
		let salt = crypto.randomBytes(16);
		crypto.scrypt(password.toString("hex"), salt.toString("hex"), 16, (err, hashedPassword) => {
			if (err) reject(err);
			else {
				resolve({
					salt: salt.toString('hex'),
					hashedPassword: hashedPassword.toString('hex')
				});
			}
		});
	});
}

exports.getUserById = (id) => {
	return new Promise((resolve, reject) => {

		const sql = 'SELECT * FROM USER WHERE userID=?';
		db.get(sql, [id], (err, row) => {
			if (err)
				reject(err);
			else if (row === undefined)
				resolve({ error: 'User not found' });
			const user = {
				userID: row.userID, name: row.name, surname: row.surname,
				phoneNumber: row.phoneNumber, type: row.type, verified: row.verified
			}
			resolve(user);

		});
	});
};

exports.getUserByToken = (token) => {
	return new Promise((resolve, reject) => {

		const sql = 'SELECT * FROM USER WHERE token=?';
		db.get(sql, [token], (err, row) => {
			if (err)
				reject(err);
			else if (row === undefined)
				reject({ error: 'Token is wrong' });
			const user = {
				userID: row.userID, name: row.name, surname: row.surname,
				phoneNumber: row.phoneNumber, type: row.type, verified: row.verified, email: row.email
			}
			resolve(user);

		});
	});
};

exports.verifyUser = (id) => {
	return new Promise((resolve, reject) => {

		const sql = 'UPDATE USER SET verified = 1 WHERE userID=?';
		db.run(sql, [id], (err) => {
			if (err) reject(err);
			resolve(true);
		});
	});
};

exports.getUser = (email, password) => {
	return new Promise((resolve, reject) => {
		const sql = 'SELECT * FROM USER WHERE email = ?';
		db.get(sql, [email], (err, row) => {
			if (err) { reject(err); }
			else if (row === undefined) { resolve(false); }
			const user = {
				userID: row.userID, name: row.name, surname: row.surname, email: row.email,
				phoneNumber: row.phoneNumber, type: row.type, token: row.token, verified: row.verified
			}
			const salt = row.salt.toString("hex");
			crypto.scrypt(password.toString("hex"), salt.toString("hex"), 16, (err, hashedPassword) => {
				if (err) reject(err);
				const passwordHex = Buffer.from(row.hashedPassword, 'hex');
				if (!crypto.timingSafeEqual(passwordHex, hashedPassword))
					resolve(false);
				else resolve(user);
			});

		});
	});
};

function StoreUser(user, salt, password, token) {

	let { name, surname, email, phoneNumber, type } = user

	return new Promise((resolve, reject) => {
		let sql = "INSERT INTO User(NAME, SURNAME, EMAIL, PHONENUMBER, TYPE, SALT, HASHEDPASSWORD, TOKEN, VERIFIED) VALUES(?, ?, ?, ?, ?, ?, ?, ?, 0)";

		db.run(sql, [name, surname, email, phoneNumber, type, salt, password, token], function (err) {
			if (err) {
				console.err("Err: ", err)
				reject(err);
			}

			let newUser = {
				userID: this.lastID, name: name, surname: surname, email: email,
				phoneNumber: phoneNumber, type: type, token: token, verified: user.verified
			}
			resolve(newUser);

		})
	});
}

/**
 * Registers new user (friend or hiker) if it's not already present in the datatbase
 * 
 * @param {string} name 
 * @param {string} surname 
 * @param {string} email 
 * @param {string} phoneNumber 
 * @param {string} type 
 * @param {string} password 
 * @param {string} token 
 * @returns User object
 */
exports.Register = async (user, token) => {

	await CheckExistingUser(user.email, user.phoneNumber)
		.catch(err => { throw err })

	let pass;
	await EncryptPassword(user.password)
		.then(p => pass = p)
		.catch(err => { throw err })


	let finalUser;
	await StoreUser(user, pass.salt, pass.hashedPassword, token)
		.then(u => finalUser = u)
		.catch(err => { throw err })

	return finalUser
}