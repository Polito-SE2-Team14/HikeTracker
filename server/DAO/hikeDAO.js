//import sqlite from "sqlite3";
//const { db } = require("../database/dbManager");
const { writeFile, unlink } = require("fs");

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
exports.getAllHikes = function () {
	return new Promise((resolve, reject) => {
		const sql = "SELECT * FROM HIKE";
		db.all(sql, [], (err, rows) => {
			if (err) {
				reject(err);
				return;
			}
			try {
				const hikes = rows.map(
					(h) =>{
						return {
							hikeID: h.hikeID,
							title: h.title,
							length: h.length,
							expectedTime: h.expectedTime,
							ascent: h.ascent,
							difficulty: h.difficulty,
							description: h.description,
							startPointID: h.startPointID,
							endPointID: h.endPointID,
							municipality: h.municipality,
							province: h.province,
							track: getTrack(h.hikeID)
						};
					}
				);
				resolve(hikes);
			}
			catch (e) {
				console.log(e)
				reject(e);
			}
		});
	});
}

/**
 * Checks if a hike is present in the database
 * @param {number} wantedID - Id of the searched hike
 * @returns {Promise} Boolean value telling if the hike exists
 */
exports.check_hike = function (wantedID) {
	return new Promise((resolve, reject) => {
		db.get("SELECT * FROM HIKE WHERE hikeID=?", [wantedID], (err, row) => {
			if (err) {
				// TODO(antonio): better error handling
				reject(err);
			}

			resolve(row !== undefined);
		});
	});
}

/**
 * Get the hike associated to the ID passed
 * @param {number} wantedID - Id of the searched hike
 * @returns {boolean} Boolean value telling if the hike exists
 */
exports.getHike = function (wantedID) {
	db.get("SELECT * FROM HIKE WHERE hikeID=?", [wantedID], (err, row) => {
		if (err) {
			reject(err);
			return;
		} else {
			try {
				row.track = getTrack(row.id);

				resolve(row);
			}
			catch (e) {
				reject(e);
			}
		}
	})
}

/**
 * Inserts a new hike in the database
 * @param {Hike} newHike - The hike to insert
 * @returns {Promise} a promise containing the new hike in case of success or an error
 */
exports.addHike = function (newHike) {
	return new Promise((resolve, reject) => {
		db.run(
			"INSERT INTO HIKE (title,length,expectedTime,ascent,difficulty,description,startPointID,endPointID,municipality,province) VALUES(?,?,?,?,?,?,?,?,?,?)",
			[
				newHike.title,
				newHike.length,
				newHike.expectedTime,
				newHike.ascent,
				newHike.difficulty,
				newHike.description,
				newHike.startPointID,
				newHike.endPointID,
				newHike.municipality,
				newHike.province
			],
			function (err) {
				if (err) {
					reject(err);
					return;
				} else {
					try {
						newTrack(this.lastID, newHike.track);

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
								endPointID: newHike.endPointID,
								municipality: newHike.municipality,
								province: newHike.province,
								track: newHike.track
							}
						);
					}
					catch (e) {
						reject(e);
					}
				}
			}
		);
	});
}

/**
 * Updates a hike in the database
 * @param {Hike} newHike - The updated version of the hike
 * @returns {Promise} a promise containing the new hike in case of success or an error
 */
exports.updateHike = function (newHike) {
	return new Promise((resolve, reject) => {
		db.run(
			"UPDATE HIKE SET title=?, length=?, expectedTime=?, ascent=?, difficulty=?, description=?, startPointID=?, endPointID=?, municipality=?, province=? WHERE hikeID =?",
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
				newHike.municipality,
				newHike.province
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
}

exports.deleteHike = function (hikeID) {
	const sql = "DELETE FROM HIKE WHERE hikeID = ?";
	const params = [hikeID];

	return new Promise((resolve, reject) => {
		db.run(sql, params, (err) => {
			if (err) {
				reject(err);
				return;
			} else {
				try {
					deleteTrack(hikeID);

					resolve(`Hike with ID ${hikeID} deleted correctly`);
				}
				catch (e) {
					reject(e);
				}
			}
		});
	});
}

exports.setStart = function (hikeID, startPointID) {
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

exports.setEnd = function (hikeID, endPointID) {
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

function newTrack(hikeId, track) {
	writeFile(`../database/tracks/_${hikeId}_.trk`, JSON.stringify(track), {flag: 'wx', encoding: 'utf8'}, err => {
		if (err) throw err;
	});
}

function getTrack(hikeId) {
	return require(`../database/tracks/_${hikeId}_.trk`);
}

function deleteTrack(hikeId) {
	unlink(`../database/tracks/_${hikeId}_.trk`, err => {
		if (err) throw err;
	});
}