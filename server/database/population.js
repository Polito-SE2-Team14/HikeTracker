const { readFileSync } = require("fs");
const path = require("path");
const gpxParser = require('gpxparser');
const crypto = require("crypto");

const Singleton = require('./DBManagerSingleton');
const DBManager = require("../database/DBManager");
/** @type {DBManager} */
const dbManager = Singleton.getInstance();

const images = require('./images')
const HikeDAO = require('../DAO/hikeDAO');
const userDAO = require("../DAO/UserDAO")
const pointsDAO = require("../DAO/pointsDAO")
const hutController = require("../Controller/HutController")
const parkingLotController = require("../Controller/ParkingLotController");

function hikesCreation() {
	console.log("Adding hikes")

	const jsonString = readFileSync(path.join(__dirname, "./dbFiles/hikes.json"));
	const hikes = JSON.parse(jsonString).hikes;
	return hikes.map(h => {
		let gpx = new gpxParser();
		let data = readFileSync(path.join(__dirname, `../../Tracks/${h.title}.gpx`), 'utf8');
		gpx.parse(data);
		h.length = Math.round(gpx.tracks[0].distance.total);
		h.ascent = gpx.tracks[0].elevation.pos ? Math.round(gpx.tracks[0].elevation.pos) : 0;
		h.expectedTime = Math.round((12.09 * h.length + 98.4 * h.ascent) / 1000);
		h.track = gpx.tracks[0].points.map(p => [p.lat, p.lon]);
		h.description = "A description";
		return HikeDAO.addHike(h);
	});
}

async function usersCreation() {
	console.log("Adding users")
	const jsonString = readFileSync(path.join(__dirname, "./dbFiles/user.json"));
	const users = JSON.parse(jsonString).users;

	let toReturn = [];
	for (let i = 0; i < users.length; i++) {
		let user = await userDAO.Register(users[i], crypto.randomBytes(20).toString('hex'), 1, 1)
		toReturn.push(user);
	}
	return toReturn;
}

function userStatsCreation() {
	let db = dbManager.getDB()
	const jsonStatsString = readFileSync(path.join(__dirname, "./dbFiles/userStats.json"));
	const usersStats = JSON.parse(jsonStatsString).stats;

	let commands = [];
	usersStats.map((us) => {
		let sqlInsert = `INSERT INTO USER_STATS (`;
		let sqlValues = ` VALUES (`;

		Object.entries(us).forEach(([key, value]) => {
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
		commands.push(sqlInsert);
	})

	return commands.map(sql => createDropTables(db, sql));
}

function pointsCreation() {
	console.log("Adding points")

	const jsonString = readFileSync(path.join(__dirname, "./dbFiles/points.json"));
	const points = JSON.parse(jsonString).points;

	return points.map(p => {
		if (p.type === "generic")
			return pointsDAO.createPoint(p)

		else if (p.type === "hut")
			return hutController.createHut(p)

		else if (p.type === "parkinglot")
			return parkingLotController.addParkingLot(p)

		else console.log(p)
	})
}

function tablesDropping() {
	console.log("TableDropping")
	let db = dbManager.getDB()

	const commands = [
		` DROP TABLE IF EXISTS HUT;`,
		`DROP TABLE IF EXISTS PARKINGLOT;`,
		`DROP TABLE IF EXISTS HIKEREFERENCEPOINT;`,
		`DROP TABLE IF EXISTS HIKELINKHUT;`,
		`DROP TABLE IF EXISTS POINT;`,
		`DROP TABLE IF EXISTS HIKE;`,
		`DROP TABLE IF EXISTS USER_STATS;`,
		`DROP TABLE IF EXISTS USER;`,
		`DROP TABLE IF EXISTS USERHIKERECORDS`
	]
	return commands.map(sql => createDropTables(db, sql))

}

function tablesCreations() {
	let db = dbManager.getDB()
	console.log("TableCreation")
	const commands = [
		` CREATE TABLE USER (userID INTEGER PRIMARY KEY,name TEXT,surname TEXT,email TEXT,phoneNumber TEXT,type TEXT,salt TEXT,	hashedPassword TEXT,verified INTEGER,approved INTEGER,token TEXT);`,
		` CREATE TABLE POINT(pointID INTEGER PRIMARY KEY,name TEXT,description TEXT, altitude REAL, latitude REAL,longitude REAL,address TEXT,municipality TEXT,province TEXT,country TEXT, pointType TEXT NOT NULL,creatorID INTEGER);`,
		` CREATE TABLE HUT (hutID INTEGER PRIMARY KEY,bedspace INTEGER, phoneNumber TEXT, website TEXT, email TEXT);`,
		` CREATE TABLE PARKINGLOT(parkingLotId INTEGER PRIMARY KEY,	carspace INTEGER);`,
		` CREATE TABLE HIKEREFERENCEPOINT(hikeID INTEGER NOT NULL,referencePointID INTEGER NOT NULL,PRIMARY KEY(hikeID, referencePointId));`,
		` CREATE TABLE HIKELINKHUT(hikeID INTEGER NOT NULL,hutID INTEGER NOT NULL,PRIMARY KEY(hikeID, hutID));`,
		` CREATE TABLE HIKE(hikeID INTEGER PRIMARY KEY,title TEXT,length INTEGER,expectedTime INTEGER,ascent INTEGER,difficulty TEXT,startPointID INTEGER,endPointID INTEGER,description TEXT,municipality TEXT,province TEXT,country TEXT,creatorID INTEGER	);`,
		` CREATE TABLE USER_STATS (userID INTEGER PRIMARY KEY, completedHikes INTEGER, favouriteDifficulty TEXT, minTime INTEGER, maxTime INTEGER, totalTime INTEGER, averageTime INTEGER, minDistance INTEGER, maxDistance INTEGER, totalDistance INTEGER, averageDistance INTEGER, favouriteCountry TEXT, favouriteProvince TEXT, minAscent INTEGER, maxAscent INTEGER, averageAscent INTEGER);`,
		` CREATE TABLE USERHIKERECORDS (userID INTEGER NOT NULL, hikeID INTEGER NOT NULL, startDate TEXT NOT NULL, endDate TEXT, status TEXT, PRIMARY KEY(userID, hikeID, startDate))`
	]
	return commands.map(sql => createDropTables(db, sql))

}

function createDropTables(db, sql) {
	return new Promise((resolve, reject) => {
		db.run(sql, err => {
			if (err) { console.error(sql, err); reject(err); }
			else resolve();
		})
	})
}

async function hikeImagePopulation() {
	const hikes = await HikeDAO.getAllHikes()
	for (let i = 0; i < hikes.length; i++) {
		await images.readResizeCropSave(`../Images/hikes/${hikes[i].hikeID}.jpg`, hikes[i].hikeID, "hike")
	}
}

async function hutImagePopulation() {
	let huts = await pointsDAO.getAllPoints()
	huts = huts.filter(h => h.pointType === "hut")
	for (let i = 0; i < huts.length; i++) {
		await images.readResizeCropSave(`../Images/huts/${i+1}.jpg`, huts[i].pointID, "hut");
	}
}

console.log("Start")

Promise.all(tablesDropping())
	.then(() => {
		Promise.all(tablesCreations())
			.catch((err) => { console.error("TablesCreation", err) })
			.then(() => {
				Promise.all(hikesCreation())
					.catch((err) => { console.error("Hike", err) })
			}).then(async () => {
				await usersCreation();
				// Promise.all(usersCreation())
				// 	.catch((err) => { console.error("User", err) })

			}).then(() => {
				Promise.all(pointsCreation())
					.catch((err) => { console.error("Points", err) })
			}).then(() => {
				Promise.all(userStatsCreation())
					.catch((err) => { console.error("Points", err) })
			}).then(async () => {
				await hikeImagePopulation()
			}).then(async () => {
				await hutImagePopulation()
			}).then(() => {
				console.log("Finish")
			})
	})