const Singleton = require('./DBManagerSingleton');
const DBManager = require("../database/DBManager");
/** @type {DBManager} */
const dbManager = Singleton.getInstance();


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
				console.log("Finish")
			})
	})
