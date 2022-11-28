const { writeFile, unlink, readFileSync } = require("fs");

const Singleton = require("../database/DBManagerSingleton");
const DBManager = require("../database/DBManager");
/** @type {DBManager} */
const dbManager = Singleton.getInstance();
const db = dbManager.getDB();

const path = require("path");

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
			}
			try {
				const hikes = rows.map(
					(h) => {
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
	return new Promise((resolve, reject) => {
		db.get("SELECT * FROM HIKE WHERE hikeID=?", [wantedID], (err, row) => {
			if (err) {
				reject(err);
			} else {
				try {
					row.track = getTrack(row.hikeID);

					resolve(row);
				}
				catch (e) {
					reject(e);
				}
			}
		});
	});
}

/**
 * Inserts a new hike in the database
 * @returns {Promise} a promise containing the new hike in case of success or an error
 */
exports.addHike = function (newHike) {

	let { title, length, expectedTime, ascent, difficulty, description,
		startPointID, endPointID, municipality, province, track } = newHike

	return new Promise((resolve, reject) => {
		db.run(
			"INSERT INTO HIKE (title,length,expectedTime,ascent,difficulty,description,startPointID,endPointID,municipality,province) VALUES(?,?,?,?,?,?,?,?,?,?)",
			[
				title, length, expectedTime, ascent, difficulty, description,
				startPointID, endPointID, municipality, province
			],
			function (err) {
				if (err)
					reject(err);

				try {
					newTrack(this.lastID, track);
					resolve(
						{
							hikeID: this.lastID,
							title: title,
							length: length,
							expectedTime: expectedTime,
							ascent: ascent,
							difficulty: difficulty,
							description: description,
							startPointID: startPointID,
							endPointID: endPointID,
							municipality: municipality,
							province: province,
							track: track
						}
					);
				}
				catch (e) {
					reject(e);
				}
			}
		);
	});
}

/**
 * Updates a hike in the database
 * @returns {Promise} a promise containing the new hike in case of success or an error
 */
exports.updateHike = function (newHike) {

	let { hikeID, title, length, expectedTime, ascent, difficulty, description,
		startPointID, endPointID, municipality, province } = newHike

	return new Promise((resolve, reject) => {
		db.run(
			"UPDATE HIKE SET title=?, length=?, expectedTime=?, ascent=?, difficulty=?, description=?, startPointID=?, endPointID=?, municipality=?, province=? WHERE hikeID =?",
			[
				title, length, expectedTime, ascent, difficulty,
				description, startPointID, endPointID, hikeID, municipality, province
			],
			(err) => {
				if (err)
					reject(err);
				resolve(`Hike with ID ${hikeID} updated correctly`);

			}
		);
	});
}

exports.deleteHike = function (hikeID) {
	const sql = "DELETE FROM HIKE WHERE hikeID = ?";
	const params = [hikeID];

	return new Promise((resolve, reject) => {
		db.run(sql, params, (err) => {
			if (err)
				reject(err);
			try {
				deleteTrack(hikeID);
				resolve(`Hike with ID ${hikeID} deleted correctly`);
			}
			catch (e) {
				reject(e);
			}

		});
	});
}

exports.getHikeTrack = function (hikeID) {
	let track;

	try {
		track = readFileSync(path.join(__dirname, `../database/tracks/_${hikeID}_.trk`), 'utf8');
	} catch (err) {
		console.log(err);
	}

	return track;
}

exports.setStart = function (hikeID, startPointID) {
	return new Promise((resolve, reject) => {
		db.run(
			"UPDATE HIKE SET startPointID=? WHERE hikeID =?",
			[startPointID, hikeID],
			(err) => {
				if (err)
					reject(err);
				resolve(`Hike with ID ${hikeID} updated correctly`);
			}
		);
	});
}

exports.setEnd = function (hikeID, endPointID) {
	return new Promise((resolve, reject) => {
		db.run(
			"UPDATE HIKE SET endPointID=? WHERE hikeID =?",
			[endPointID, hikeID],
			(err) => {
				if (err)
					reject(err);
				resolve(`Hike with ID ${hikeID} updated correctly`);
			}
		);
	});
}


function newTrack(hikeId, track) {
	const SOURCE = path.join(__dirname, `../database/tracks/_${hikeId}_.trk`);
	writeFile(SOURCE, JSON.stringify(track), { flag: 'w', encoding: 'utf8' }, err => {
		if (err) throw err;
	});
}

function getTrack(hikeId) {
	return require(path.join(__dirname, `../database/tracks/_${hikeId}_.trk`));
}

function deleteTrack(hikeId) {
	const SOURCE = path.join(__dirname, `../database/tracks/_${hikeId}_.trk`);
	unlink(SOURCE, err => {
		if (err) throw err;
	});
}