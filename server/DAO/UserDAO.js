const crypto = require("node:crypto");

const Singleton = require("../database/DBManagerSingleton")
const DBManager = require("../database/DBManager");
const { resolve } = require("node:path");
const { user } = require("../Config/nodemailer.config");
const { unwatchFile } = require("node:fs");
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
				phoneNumber: row.phoneNumber, type: row.type, verified: row.verified,
				approved: row.approved,
				email: row.email, completedHikes: row.completedHikes,
				favouriteDifficulty: row.favouriteDifficulty, minTime: row.minTime,
				maxTime: row.maxTime, totalTime: row.totalTime, averageTime: row.averageTime,
				minDistance: row.minDistance, maxDistance: row.maxDistance,
				totalDistance: row.totalDistance, averageLength: row.averageLength,
				favouriteCountry: row.favouriteCountry, favouriteProvince: row.favouriteProvince,
				minAscent: row.minAscent, maxAscent: row.maxAscent, averageAscent: row.averageAscent,
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
				phoneNumber: row.phoneNumber, type: row.type, verified: row.verified, email: row.email,
				approved: row.approved
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

exports.approveUser = (userID) => {
	return new Promise((resolve, reject) => {
		const sql = 'UPDATE USER SET approved = 1 WHERE userID=?';
		db.run(sql, [userID], (err) => {
			if (err) reject(err);
			resolve(true);
		});
	});
};

exports.unApproveUser = (userID) => {
	return new Promise((resolve, reject) => {
		const sql = 'UPDATE USER SET approved = 0 WHERE userID=?';
		db.run(sql, [userID], (err) => {
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
			else if (row === undefined) { return resolve(false); }
			const user = {
				userID: row.userID, name: row.name, surname: row.surname, email: row.email,
				phoneNumber: row.phoneNumber, type: row.type, token: row.token, verified: row.verified,
				approved: row.approved
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

function StoreUser(user, salt, password, token, verified = 0, approved = 0) {

	let { name, surname, email, phoneNumber, type } = user

	return new Promise((resolve, reject) => {
		let sql = "INSERT INTO User(NAME, SURNAME, EMAIL, PHONENUMBER, TYPE, SALT, HASHEDPASSWORD, TOKEN, VERIFIED, APPROVED) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

		db.run(sql, [name, surname, email, phoneNumber, type, salt, password, token, verified, approved], function (err) {
			if (err) {
				console.error("Err: ", err)
				reject(err);
			}

			let newUser = {
				userID: this.lastID, name: name, surname: surname, email: email,
				phoneNumber: phoneNumber, type: type, token: token, verified: verified, approved: approved
			}
			resolve(newUser);

		})
	});
}

/**
 * @param {string} type 
 * @param {boolean} orderByUnapproved  
 * @returns Array of User objects
 */
exports.getUsersByType = (type, orderByUnapproved = false) => {

	return new Promise((resolve, reject) => {
		let sql = "SELECT * FROM User WHERE type = ?";

		if (orderByUnapproved) {
			sql = sql + " ORDER BY approved = 0 DESC";
		}

		db.all(sql, [type], function (err, rows) {
			if (err) {
				console.error("Err: ", err)
				reject(err);
			}

			const users = rows.map(row => {
				return {
					userID: row.userID, name: row.name, surname: row.surname, email: row.email,
					phoneNumber: row.phoneNumber, type: row.type, token: row.token, verified: row.verified, approved: row.approved
				}
			}
			)
			resolve(users);

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
exports.Register = async (user, token, verified, approved) => {

	await CheckExistingUser(user.email, user.phoneNumber)
		.catch(err => { throw err })

	let pass;
	await EncryptPassword(user.password)
		.then(p => pass = p)
		.catch(err => { console.log(err); throw err })


	let finalUser;
	await StoreUser(user, pass.salt, pass.hashedPassword, token, verified, approved)
		.then(u => finalUser = u)
		.catch(err => { console.log(err); throw err })

	return finalUser
}

//updates the user adding only the provided info (not all fields are mandatory)
exports.addUserStats = (userStats) => {
	return new Promise((resolve, reject) => {
		db.get("SELECT * FROM USER WHERE userID=?;", [userStats.userID], (err, row) => {
			if (err) {
				console.error(err);
				reject(err);
			}
			if (row == null) {
				reject({ error: "User not found" });
			}

			let sqlInsert = `INSERT INTO USER_STATS (`;
			let sqlValues = ` VALUES (`;

			Object.entries(userStats).forEach(([key, value]) => {
				sqlInsert += `${key}, `;
				if (typeof value == 'string' || value instanceof String) {
					sqlValues += `"${value}", `;
				} else {
					sqlValues += `${value}, `;
				}
			});

			sqlInsert = sqlInsert.substring(0, sqlInsert.length - 2);
			sqlInsert += ")"
			sqlValues = sqlValues.substring(0, sqlValues.length - 2);
			sqlValues += ");";
			sqlInsert += sqlValues;

			db.run(sqlInsert, (err) => {
				if (err) {
					reject(err);
				} else {
					resolve(true);
				}
			})
		}
		)
})
}

exports.getUserStats = (userID) => {
	return new Promise((resolve, reject) => {
		db.get("SELECT * FROM USER WHERE userID=?", [userID], (err, row) => {
			if (err) {
				reject(err);
			} else if (row == null | row == undefined) {
				reject({ err: "No info for the given ID" });
			} else {
				db.get("SELECT * FROM USER_STATS WHERE userID=?", [userID], (err, row) => {
					if (err) {
						reject(err);
					} else if (row == null | row == undefined) {
						resolve(false);
					} else {
						const userStats = {
							userID: row.userID,
							completedHikes: row.completedHikes,
							favouriteDifficulty: row.favouriteDifficulty,
							minTime: row.minTime,
							maxTime: row.maxTime,
							totalTime: row.totalTime,
							averageTime: row.averageTime,
							minDistance: row.minDistance,
							maxDistance: row.maxDistance,
							totalDistance: row.totalDistance,
							averageDistance: row.averageDistance,
							favouriteCountry: row.favouriteCountry,
							favouriteProvince: row.favouriteProvince,
							minAscent: row.minAscent,
							maxAscent: row.maxAscent,
							averageAscent: row.averageAscent
						}
						resolve(userStats);

					}
				})
			}
		})
	})
}

exports.updateUserStats = (userID, newUserStats) => {
	return new Promise((resolve, reject) => {
		db.get("SELECT * FROM USER WHERE userID=?;", [userID], (err, row) => {
			if (err) {
				console.log(err);
				reject(err);
			} else if (row == null || row == undefined) {
				reject({ error: "User not found" });
			} else {
				
				let sqlUpdate =
					`UPDATE USER_STATS SET 
				COMPLETEDHIKES = ?,FAVOURITEDIFFICULTY = ?,MINTIME = ?,
				MAXTIME = ?,TOTALTIME = ?,AVERAGETIME = ?,
				MINDISTANCE = ?,MAXDISTANCE = ?,TOTALDISTANCE = ?,
				AVERAGEDISTANCE = ?,FAVOURITECOUNTRY = ?,FAVOURITEPROVINCE = ?,
				MINASCENT = ?,	MAXASCENT = ?,	AVERAGEASCENT = ?
				WHERE userID = ?`
				db.run(sqlUpdate, [newUserStats.completedHikes, newUserStats.favouriteDifficulty,
				newUserStats.minDistance, newUserStats.maxDistance, newUserStats.totalTime,
				newUserStats.averageTime, newUserStats.minDistance, newUserStats.maxDistance,
				newUserStats.totalDistance, newUserStats.averageDistance, newUserStats.favouriteCountry,
				newUserStats.favouriteProvince, newUserStats.minAscent, newUserStats.maxAscent,
				newUserStats.averageAscent, userID], function (err) {
					if (err) {
						reject(err);
					} else {
						resolve(newUserStats);
					}
				})
			}
		})
	})
}