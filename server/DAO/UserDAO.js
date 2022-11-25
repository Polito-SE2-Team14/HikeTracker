const crypto = require("crypto");

const Singleton = require("../database/DBManagerSingleton")
const DBManager = require("../database/DBManager");
/** @type {DBManager} */
const dbManager = Singleton.getInstance();
const db = dbManager.getDB();

//const User = require("../Class/User");

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
				//const user = new User(row.userID, row.name, row.surname, row.email, row.phoneNumber, row.type);
				const user = { userID: row.userID, name: row.name, surname: row.surname, email: row.email, phoneNumber: row.phoneNumber, type: row.type }
				const salt = row.salt.toString("hex");
				crypto.scrypt(password.toString("hex"), salt.toString("hex"), 16, (err, hashedPassword) => {
					if (err) reject(err);
					const passwordHex = Buffer.from(row.hashedPassword, 'hex');
					if (!crypto.timingSafeEqual(passwordHex, hashedPassword))
						resolve(false);
					else resolve(user);
				});
			}
		});
	});
};

function StoreUser(user, salt, password) {
	return new Promise((resolve, reject) => {
		let sql = "INSERT INTO User(NAME, SURNAME, EMAIL, PHONENUMBER, TYPE, SALT, HASHEDPASSWORD) VALUES(?, ?, ?, ?, ?, ?, ?)";


		db.run(sql, [user.name, user.surname, user.email, user.phoneNumber, user.type, salt, password], function (err) {
			if (err) {
				console.err("Err: ", err)
				reject(err);
			}
			else {
				let newUser = { userID: this.lastID, name: user.name, surname: user.surname, email: user.email, phoneNumber: user.phoneNumber, type: user.type }
				console.error("newUser", newUser)
				resolve(newUser);
			}
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
 * @returns User object
 */
exports.Register = async (user) => {

	await CheckExistingUser(user.email, user.phoneNumber)
		.catch(err => { throw err })

	let pass;
	await EncryptPassword(user.password)
		.then(p => pass = p)
		.catch(err => { throw err })

	console.log(pass)

	let finalUser;
	await StoreUser(user, pass.salt, pass.hashedPassword)
		.then(u => finalUser = u)
		.catch(err => { throw err })

	console.log(finalUser)
	return finalUser
}