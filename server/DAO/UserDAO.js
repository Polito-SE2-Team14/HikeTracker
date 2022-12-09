const crypto = require("node:crypto");

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
				phoneNumber: row.phoneNumber, type: row.type, verified: row.verified,
				email: row.email, completedHikes: row.completedHikes,
				favouriteDifficulty: row.favouriteDifficulty, minTime: row.minTime,
				maxTime: row.maxTime, totalTime: row.totalTime, averageTime: row.averageTime,
				minDistance: row.minDistance, maxDistance: row.maxDistance,
				totalDistance: row.totalDistance, averageLength: row.averageLength,
				favouriteCountry: row.favouriteCountry, favouriteProvince: row.favouriteProvince,
				minAscent: row.minAscent, maxAscent: row.maxAscent, averageAscent: row.averageAscent
			}
			resolve(user);

		});
	});
};

//updates the user adding only the provided info (not all fields are mandatory)
exports.updateUser = (userID,info)=>{
	return new Promise((resolve,reject)=>{
		db.get("SELECT * FROM USER WHERE userID=?",[userID],(err,row)=>{
			if(err){
				reject(err);
			}else if(row==null | row==undefined){
				reject({error: "User not found"});
			}else{
				let sqlUpdate="UPDATE USER SET";
				let sqlWHERE=` WHERE userID=${userID};`;
				
				Object.entries(info).forEach(([key,value]) => {
					if(typeof value == 'string' || value instanceof String){
						sqlUpdate+=` ${key} = "${value}",`;
					}else{
						sqlUpdate+=` ${key} = ${value},`;
					}
				});

				//remove the last ","
				sqlUpdate=sqlUpdate.substring(0,sqlUpdate.length-1);
				sqlUpdate+=sqlWHERE;

				db.run(sqlUpdate,(err)=>{
					if(err){
						reject(err);
					}else{
						resolve({...row,...info});
					}
				})
			}
		})
	})
}

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
			else if (row === undefined) { return resolve(false); }
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
		.catch(err => { throw err })


	let finalUser;
	await StoreUser(user, pass.salt, pass.hashedPassword, token, verified, approved)
		.then(u => finalUser = u)
		.catch(err => { throw err })
	
	// we must add only the necessary information
	delete user.name;
	delete user.surname;
	delete user.email;
	delete user.phoneNumber;
	delete user.type;
	delete user.password;
	await this.updateUser(finalUser.userID,{...user})
		.then(u=> finalUser=u)
		.catch(err => {throw err});

	return finalUser
}