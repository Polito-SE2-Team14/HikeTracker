const sqlite = require("sqlite3");
const fs = require("fs");

const Singleton = require("../database/DBManagerSingleton");
const DBManager = require("../database/DBManager");
const { captureRejectionSymbol } = require("events");
/** @type {DBManager} */
const dbManager = Singleton.getInstance();
const db = dbManager.getDB();

exports.getAllParkingLots = () => {
	return new Promise((resolve, reject) => {
		db.all("SELECT * FROM POINT P, PARKINGLOT PA WHERE P.pointID = PA.parkinglotID AND pointType = 'parkinglot'", (err, rows) => {
			if (err) {
				reject(err);
				return;
			}
			const pLots = rows.map(r => {
				return {
					pLotId: r.parkinglotID,
					name: r.name,
					carspace: r.carspace,
					municipality: r.municipality,
					province: r.province,
					latitude: r.latitude,
					longitude: r.longitude,
					pointID: r.pointID,
					address: r.address,
					pointType: r.pointType
				}
			});
			resolve(pLots);
		});
	});
};

exports.getParkingLotById = (id) => {
	return new Promise((resolve, reject) => {
		db.get(`SELECT * FROM PARKINGLOT WHERE pLotId=${id}`, (err, row) => {
			if (err) {
				reject(err);
				return;
			}
			if (row == undefined) {
				reject("No parking lot has the given id");
				return;
			}
			resolve(row);
		});
	});
};

exports.parkingLotExists = (id) => {
	return new Promise((resolve, reject) => {
		db.get(`SELECT * FROM PARKINGLOT WHERE parkingLotId=${id}`, (err, row) => {
			if (err) {
				reject(err);
				return;
			}
			resolve(row !== undefined);
		});
	});
};

exports.addParkingLot = (newPLot) => {
	return new Promise((resolve, reject) => {
		db.run("INSERT INTO PARKINGLOT (name,municipality,province,carspace) VALUES (?,?,?,?);",
			[newPLot.name, newPLot.municipality, newPLot.province, newPLot.carspace],
			function (err) {
				if (err) {
					console.log(err);
					reject(err);
					return;
				}
				resolve({
					pLotId: this.lastID,
					name: newPLot.name,
					carspace: newPLot.carspace,
					municipality: newPLot.municipality,
					province: newPLot.province
				});
			})
	});
};

exports.deleteParkingLot = (id) => {
	return new Promise((resolve, reject) => {
		db.run(`DELETE FROM PARKINGLOT WHERE parkingLotId=${id}`, (err) => {
			if (err) {
				reject(err);
				return;
			}
			resolve();
		})
	});
};