const { writeFile, unlink, readFileSync } = require("fs");

const Singleton = require("../database/DBManagerSingleton");
const DBManager = require("../database/DBManager");
/** @type {DBManager} */
const dbManager = Singleton.getInstance();
const db = dbManager.getDB();

const path = require("path");
const { resolve } = require("path");

/**
 * Queries the db to get all hikes
 * @returns {Promise} A promise containing a vector with all the hikes or a message error
 */
exports.getAllHikes = function () {
	return new Promise((resolve, reject) => {
		const sql = `SELECT * FROM HIKE H, USER U WHERE U.userID = H.creatorID`;
		db.all(sql, [], (err, rows) => {
			if (err) {
				reject(err);
			}
			try {
				const hikes = rows.map(
					(h) => {
						return {
							hikeID: h.hikeID, title: h.title,
							length: h.length, expectedTime: h.expectedTime,
							ascent: h.ascent, difficulty: h.difficulty,
							description: h.description, startPointID: h.startPointID,
							endPointID: h.endPointID, municipality: h.municipality,
							province: h.province, country: h.country,
							track: this.getHikeTrack(h.hikeID), creatorID: h.creatorID,
							creatorName: h.name, creatorSurname: h.surname
						};
					});
				resolve(hikes);
			}
			catch (e) {
				console.error(e)
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
		db.get(`SELECT * FROM HIKE WHERE hikeID=?`, [wantedID], (err, row) => {
			if (err) {
				console.error(err)
				reject(err);
			}

			resolve(row !== undefined);
		});
	});
}


function distanceBetweenCoords(p1, p2) {
	let R = 6371; // Radius of the earth in km
	let dLat = deg2rad((p2[0] - p1[0]));
	let dLon = deg2rad((p2[1] - p1[1]));

	let a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(deg2rad(p1[0])) * Math.cos(deg2rad(p2[0])) *
		Math.sin(dLon / 2) * Math.sin(dLon / 2)
		;
	let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	let d = R * c * 1000; // Distance in meters
	return d;
}

function deg2rad(deg) {
	return deg * (Math.PI / 180);
}

exports.getCloseHutsForHike = function (hikeID) {
	return new Promise((resolve, reject) => {
		db.all(`SELECT p.pointID, p.name, p.description, p.altitude, p.latitude, p.longitude, p.address, p.municipality, p.province, p.country, p.creatorID, h.bedspace, h.phoneNumber, h.website, h.email
			FROM POINT AS p, HUT AS h
			WHERE p.pointType='hut' AND h.hutID=p.pointID;`, (err, rows) => {
			if (err) {
				console.error(err)
				reject(err);
			}
			const track = this.getHikeTrack(hikeID);
			let huts = rows.filter((hut) => {
				for (let i = 0; i < track.length; i++) {
					if (distanceBetweenCoords([hut.latitude, hut.longitude], track[i]) <= 5000) {
						return true;
					}
				}
				return false;
			});
			resolve(huts);
		})
	});
}

exports.linkHutToHike = function (hutID, hikeID) {
	return new Promise((resolve, reject) => {
		db.all("SELECT * FROM POINT WHERE pointID=? AND pointType='hut'", [hutID], function (err, rows) {
			if (err) {
				console.error(err);
				reject(err);
			} else if (rows.length == 0) {
				console.error("No hut has the given ID");
				reject(new Error("No hut has the given ID"));
			} else {
				db.all("SELECT * FROM HIKE WHERE hikeID=?", [hikeID], function (err, rows) {
					if (err) {
						console.error(err);
						reject(err);
					} else if (rows.length == 0) {
						console.error("No hike has the given ID");
						reject(new Error("No hike has the given ID"));
					} else {
						db.run("INSERT INTO HIKELINKHUT (hikeID, hutID) VALUES(?,?);", [hikeID, hutID], (err) => {
							if (err) {
								console.error(err);
								reject(err);
							}
							resolve({
								hutID: hutID,
								hikeID: hikeID
							});
						})
					}
				})
			}

		})
	})
}

exports.deleteHutToHikeLink = function (hutID, hikeID) {
	return new Promise((resolve, reject) => {
		db.run("DELETE FROM HIKELINKHUT WHERE hutID=? AND hikeID=?", [hutID, hikeID], (err) => {
			if (err) {
				console.error(err);
				reject(err);
			}
			resolve({ hutID: hutID, hikeID: hikeID });
		})
	})
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
					row.track = this.getHikeTrack(row.hikeID);
					resolve(row);
				}
				catch (e) {
					console.error(e);
					reject(e);
				}
			}
		});
	});
}

exports.getReferencePointsForHike = function (hikeID) {
	return new Promise((resolve, reject) => {
		db.all(`SELECT referencePointID, address,
				P.name, latitude, longitude, province, municipality, country, description,
                address, pointType, creatorID, U.name AS creatorName,  U.surname AS creatorSurname
				FROM HIKEREFERENCEPOINT HRP, POINT P, USER U
				WHERE hikeID = ? AND U.userID = P.creatorID AND referencePointID = P.pointID`,
			[hikeID],
			(err, rows) => {
				if (err) { console.error(err); reject(err) }


				const points = rows.map(row => {
					return {
						pointID: row.referencePointID, name: row.name, latitude: row.latitude, province: row.province, municipality: row.municipality,
						country: row.country, longitude: row.longitude, address: row.address, pointType: row.pointType, creatorID: row.creatorID,
						creatorName: row.creatorName, creatorSurname: row.creatorSurname, description: row.description
					}
				}
				)


				resolve( points)
			})
	})
}

/**
 * Inserts a new hike in the database
 * @returns {Promise} a promise containing the new hike in case of success or an error
 */
exports.addHike = function (newHike) {

	let { title, length, expectedTime, ascent, difficulty, description, country,
		startPointID, endPointID, municipality, province, track, creatorID } = newHike

	return new Promise((resolve, reject) => {
		db.run(
			"INSERT INTO HIKE (title,length,expectedTime,ascent,difficulty,description,startPointID,endPointID,country,municipality,province, creatorID) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)",
			[
				title, length, expectedTime, ascent, difficulty, description,
				startPointID, endPointID, country, municipality, province, creatorID
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
							country: country,
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


exports.addReferencePoint = function (hikeID, referencePointID) {

	//let referencePointID = 0 //TODO to be defined

	return new Promise((resolve, reject) => {

		db.run("INSERT INTO HIKEREFERENCEPOINT (hikeID, referencePointID) VALUES (?,?)",
			[hikeID, referencePointID],
			function (err) {
				if (err) {
					console.error(err)
					reject(err)
				}
				resolve()
			})
	})
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
				console.error(err);
			reject(err);
			try {
				deleteTrack(hikeID);
				resolve({ msg: `Hike with ID ${hikeID} deleted correctly` });
			}
			catch (e) {
				console.error(e);
				reject(e);
			}
		});
	});
}

exports.getHikeTrack = function (hikeID) {
	const file = checkPath(`../database/tracks/_${hikeID}_.trk`);
	if (file)
		try {
			// return readFileSync(file, { encoding: 'utf8', flag: 'r' });
			return JSON.parse(readFileSync(file, { encoding: 'utf8', flag: 'r' }));
		} catch (err) {
			console.error(err);
			throw Error(err)
		}
	return null;
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
	const file = checkPath(`../database/tracks/_${hikeId}_.trk`)

	if (file)
		writeFile(file, JSON.stringify(track), { flag: 'w', encoding: 'utf8' }, err => {
			if (err) throw err;
		});
	else throw Error('wrong path');
}

function deleteTrack(hikeId) {
	let file;
	try {
		file = checkPath(`../database/tracks/_${hikeId}_.trk`)
	} catch (error) {
		console.error(error)
		throw error
	}

	unlink(file, (err) => {
		if (err) {
			console.error(err);
			throw err;
		}
	});
}

function checkPath(relativePath) {
	let resolvedPath = path.resolve(__dirname + '/' + relativePath);
	let tracksDir = path.resolve(__dirname + '/../database/tracks/_');

	if (!resolvedPath.startsWith(tracksDir)) {
		throw Error('wrong path');
	}
	else return resolvedPath;
}