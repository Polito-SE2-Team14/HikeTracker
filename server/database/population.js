const { readFileSync } = require("fs");
const path = require("path");
const gpxParser = require('gpxparser');
const crypto = require("crypto");

const Singleton = require('./DBManagerSingleton');
const DBManager = require("../database/DBManager");
/** @type {DBManager} */
const dbManager = Singleton.getInstance();

const HikeDAO = require('../DAO/hikeDAO');
const userDAO = require("../DAO/userDAO")
const pointsDAO = require("../DAO/pointsDAO")
const hutController = require("../Controller/HutControllerNew")
const parkingLotController = require("../Controller/ParkingLotControllerNew")

function hikesCreation() {
	const gpx = new gpxParser();

	const jsonString = readFileSync(path.join(__dirname, "./dbFiles/hikes.json"));
	const hikes = JSON.parse(jsonString).hikes;

	return hikes.map(h => {
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
	const jsonString = readFileSync(path.join(__dirname, "./dbFiles/user.json"));
	const users = JSON.parse(jsonString).users;

	return users.map(u => {
		//console.log(i++, "- User added")
		return userDAO.Register(u, crypto.randomBytes(20).toString('hex'))
	})
}

function pointsCreation() {

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

console.log("Start")
Promise.resolve(dbManager.clearDb()).then(
	() => {
		Promise.all(hikesCreation())
			.catch((err) => { "Hike", console.error(err) })
		Promise.all(usersCreation())
			.catch((err) => { "User", console.error(err) })
		Promise.all(pointsCreation())
			.catch((err) => { "Points", console.error(err) })

		console.log("Finish")
	})
