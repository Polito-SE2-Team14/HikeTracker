const Singleton = require("../database/DBManagerSingleton");
const DBManager = require("../database/DBManager");
/** @type {DBManager} */
const dbManager = Singleton.getInstance();
const db = dbManager.getDB();


exports.getRecords = async (userID) => {
	return new Promise((resolve, reject) => {
		const sql = "SELECT * FROM USERHIKERECORDS WHERE userID = ?";
		db.all(sql, [userID], function (err, rows) {
			if (err) reject(err);
			resolve(rows);
		});
	});
}

exports.getRecordWithStatusOpen = async (userID) => {
	return new Promise((resolve, reject) => {
		const sql = "SELECT * FROM USERHIKERECORDS WHERE userID = ? AND status = 'open' ";
		db.get(sql, [userID], function (err, row) {
			if (err) reject(err);
			resolve(row);
		});
	});
}

exports.addNewRecord = async (record) => {
	const {userID, hikeID, status, startDate, endDate} = record
	return new Promise(async (resolve, reject) => {
		let openRecord= await this.getRecordWithStatusOpen(userID)
			.catch(err=>reject(err));
		if(openRecord!=null)
			reject("No more than one hike can be open at the same time");
		const sql = "INSERT INTO USERHIKERECORDS (userID, hikeID, status, startDate, endDate) VALUES(?,?,?,?,?)";
		db.run(sql, [userID, hikeID, status, startDate, endDate], function (err, row) {
			if (err) reject(err);
			resolve();
		});
	});
}

exports.editRecord = async (record) => {
	const { userID, hikeID, status, startDate, endDate } = record
	return new Promise((resolve, reject) => {
		const sql = `UPDATE USERHIKERECORDS
					SET status=?, endDate = ?
					WHERE userID = ? AND hikeID = ? AND startDate = ?`;
		db.run(sql, [status, endDate, userID, hikeID, startDate], function (err, row) {
			if (err) reject(err);
			resolve();
		});
	});
}