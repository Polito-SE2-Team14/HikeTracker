const { readFileSync } = require("fs");
const path = require("path");
const gpxParser = require('gpxparser');
const crypto = require("crypto");

const Singleton = require('./DBManagerSingleton');
const DBManager = require("../database/DBManager");
/** @type {DBManager} */
const dbManager = Singleton.getInstance();

const HikeDAO = require('../DAO/hikeDAO');
const userDAO = require("../DAO/UserDAO")
const pointsDAO = require("../DAO/pointsDAO")
const hutController = require("../Controller/HutController")
const parkingLotController = require("../Controller/ParkingLotController")

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
		//console.log(i++, "- Hike added")
		return HikeDAO.addHike(h);
	});
}

function usersCreation() {
	console.log("Adding users")
	const jsonString = readFileSync(path.join(__dirname, "./dbFiles/user.json"));
	const users = JSON.parse(jsonString).users;

	return users.map(u => {
		//console.log(i++, "- User added")
		return userDAO.Register(u, crypto.randomBytes(20).toString('hex'), 1, 1)
	})
}

function pointsCreation() {
	console.log("Adding points")

	const jsonString = readFileSync(path.join(__dirname, "./dbFiles/points.json"));
	const points = JSON.parse(jsonString).points;

	return points.map(p => {
		//console.log(p.pointID, "- Point added")
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
		`DROP TABLE IF EXISTS USER;`
	]
	return commands.map(sql => createDropTables(db,sql))

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
		//` CREATE TABLE HIKEGROUP(groupID INTEGER NOT NULL,hikeID INTEGER NOT NULL,leaderID INTEGER NOT NULL,PRIMARY KEY(groupID, hikeID));`,
		//` CREATE TABLE HIKEGROUPMEMBER(	groupID INTEGER NOT NULL,userID INTEGER NOT NULL,confirmed INTEGER NOT NULL,completed INTEGER NOT NULL,	PRIMARY KEY(groupID, userID));`,
		//` CREATE TABLE HUTWORKER(userID INTEGER PRIMARY KEY,hutID INTEGER NOT NULL,	confirmed INTEGER NOT NULL);`
	]
	return commands.map(sql => createDropTables(db,sql))

}

function createDropTables(db,sql) {
	return new Promise((resolve, reject) => {
		db.run(sql, err => {
			if (err) { console.error(sql, err); reject(err); }
			else resolve();
		})
	})
}

console.log("Start")

Promise.all(tablesDropping())
	.then(() => {
		Promise.all(tablesCreations())
			.catch((err) => { console.error("TablesCreation", err) })
			.then(() => {
				Promise.all(hikesCreation())
					.catch((err) => { console.error("Hike", err) })
			}).then(() => {
				Promise.all(usersCreation())
					.catch((err) => { console.error("User", err) })
			}).then(() => {
				Promise.all(pointsCreation())
					.catch((err) => { console.error("Points", err) })
			})
			.then(() => {
				console.log("Finish")
			})
	})
