const sqlite = require("sqlite3");
//const { db } = require("../database/dbManager");
const fs = require("fs");


const Singleton = require("../database/DBManagerSingleton");
const DBManager = require("../database/DBManager");
/** @type {DBManager} */
const dbManager = Singleton.getInstance();
const db = dbManager.getDB();

const Hike = require("../Class/Hike");
/**
 * Queries the db to get all hikes
 * @returns {Promise} A promise containing a vector with all the hikes or a message error
 */
exports.getAllHikes = () => {
	return new Promise((resolve, reject) => {
		const sql = "SELECT * FROM HIKE";
		db.all(sql, [], (err, rows) => {
			if (err) {
				reject(err);
				return;
			}
			const hikes = rows.map(
				(h) =>
					/* new Hike(
						h.hikeID,
						h.title,
						h.length,
						h.expectedTime,
						h.ascent,
						h.difficulty,
						h.description,
						h.startPointID,
						h.endPointID
					) */ {
					return {
						hikeID: h.hikeID,
						title: h.title,
						length: h.length,
						length: h.expectedTime,
						ascent: h.ascent,
						difficulty: h.difficulty,
						description: h.description,
						startPointID: h.startPointID,
						endPointID: h.endPointID
					}
				}
			);
			resolve(hikes);
		});
	});
};

/**
 * Checks if a hike is present in the database
 * @param {number} wantedID - Id of the searched hike
 * @returns {boolean} Boolean value telling if the hike exists
 */
exports.check_hike = (wantedID) => {
	return new Promise((resolve, reject) => {
		db.get("SELECT * FROM HIKE WHERE hikeID=?", [wantedID], (err, row) => {
			if (err) {
				// TODO(antonio): better error handling
				reject(err);
			}

			resolve(row !== undefined);
		});
	});
};

/**
 * Get the hike associated to the ID passed
 * @param {number} wantedID - Id of the searched hike
 * @returns {boolean} Boolean value telling if the hike exists
 */
exports.getHike = (wantedID) => {
	db.get("SELECT * FROM HIKE WHERE hikeID=?", [wantedID], (err, row) => {
		if (err) {
			reject(err);
			return;
		} else {
			resolve(row);
		}
	});
};

/**
 * Inserts a new hike in the database
 * @param {Hike} newHike - The hike to insert
 * @returns {Promise} a promise containing the new hike in case of success or an error
 */
exports.addHike = (newHike) => {
	return new Promise((resolve, reject) => {
		db.run(
			"INSERT INTO HIKE (title,length,expectedTime,ascent,difficulty,description,startPointID,endPointID) VALUES(?,?,?,?,?,?,?,?)",
			[
				newHike.title,
				newHike.length,
				newHike.expectedTime,
				newHike.ascent,
				newHike.difficulty,
				newHike.description,
				newHike.startPointID,
				newHike.endPointID,
			],
			function (err) {
				if (err) {
					reject(err);
					return;
				} else {
					resolve(
						/* new Hike(
							this.lastID,
							newHike.title,
							newHike.length,
							newHike.expectedTime,
							newHike.ascent,
							newHike.difficulty,
							newHike.description,
							newHike.startPointID,
							newHike.endPointID
						) */
						{
							hikeID: this.lastID,
							title: newHike.title,
							length: newHike.length,
							expectedTime: newHike.expectedTime,
							ascent: newHike.ascent,
							difficulty: newHike.difficulty,
							description: newHike.description,
							startPointID: newHike.startPointID,
							endPointID: newHike.endPointID
						}
					);
				}
			}
		);
	});
};

/**
 * Updates a hike in the database
 * @param {Hike} newHike - The updated version of the hike
 * @returns {Promise} a promise containing the new hike in case of success or an error
 */
exports.updateHike = (newHike) => {
	return new Promise((resolve, reject) => {
		db.run(
			"UPDATE HIKE SET title=?, length=?, expectedTime=?, ascent=?, difficulty=?, description=?, startPointID=?, endPointID=? WHERE hikeID =?",
			[
				newHike.title,
				newHike.length,
				newHike.expectedTime,
				newHike.ascent,
				newHike.difficulty,
				newHike.description,
				newHike.startPointID,
				newHike.endPointID,
				newHike.hikeID,
			],
			(err) => {
				if (err) {
					reject(err);
					return;
				} else {
					resolve(`Hike with ID ${newHike.hikeID} updated correctly`);
				}
			}
		);
	});
};

exports.deleteHike = (hikeID) => {
	const sql = "DELETE FROM HIKE WHERE hikeID = ?";
	const params = [hikeID];

	return new Promise((resolve, reject) => {
		db.run(sql, params, (err) => {
			if (err) {
				reject(err);
				return;
			} else {
				resolve(`Hike with ID ${hikeID} deleted correctly`);
			}
		});
	});
};

exports.setStart = (hikeID, startPointID) => {
	return new Promise((resolve, reject) => {
		db.run(
			"UPDATE HIKE startPointID=? WHERE hikeID =?",
			[startPointID, hikeID],
			(err) => {
				if (err) {
					reject(err);
					return;
				} else {
					resolve(`Hike with ID ${hikeID} updated correctly`);
				}
			}
		);
	});
}

exports.setEnd = (hikeID, endPointID) => {
	return new Promise((resolve, reject) => {
		db.run(
			"UPDATE HIKE endPointID=? WHERE hikeID =?",
			[endPointID, hikeID],
			(err) => {
				if (err) {
					reject(err);
					return;
				} else {
					resolve(`Hike with ID ${hikeID} updated correctly`);
				}
			}
		);
	});
}

exports.newTrack = (hikeId, track) =>
	this.getHike(hikeId)
		.then(() => {
			fs.writeFile(`../database/tracks/_${hikeId}_.trk`, JSON.stringify(track), 'utf8', err => {
				if (err) throw err;
			})

			return true;
		})
		.catch(err => { return err; });

exports.getTrack = (hikeId) =>
	this.getHike(hikeId)
		.then(() => {
			return require(`../database/tracks/_${hikeId}_.trk`);
		})
		.catch(err => { return err; });
