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
		db.all("SELECT * FROM POINT P, PARKINGLOT PA WHERE P.pointID = PA.parkingLotId AND pointType = 'parkinglot'", (err, rows) => {
			if (err)
				reject(err);
			const pLots = rows.map(r => {
				console.log(r)
				return {
					pLotId: r.pointID,
					name: r.name,
					carspace: r.carspace,
					municipality: r.municipality,
					province: r.province,
					latitude: r.latitude,
					longitude: r.longitude,
					pointID: r.pointID,
					address: r.address,
					pointType: r.pointType,
					creatorID: r.creatorID
				}
			});
			resolve(pLots);
		});
	});
};

exports.getParkingLotById = (id) => {
	return new Promise((resolve, reject) => {
		db.get(`SELECT * FROM PARKINGLOT WHERE pLotId=${id}`, (err, row) => {
			if (err)
				reject(err);

			if (row == undefined) {
				reject("No parking lot has the given id");
			}
			resolve(row);
		});
	});
};

exports.parkingLotExists = (id) => {
	return new Promise((resolve, reject) => {
		db.get(`SELECT * FROM PARKINGLOT WHERE parkingLotId=${id}`, (err, row) => {
			if (err)
				reject(err);

			resolve(row !== undefined);
		});
	});
};

exports.addParkingLot = (pointID, carspace) => {
	return new Promise((resolve, reject) => {
		db.run("INSERT INTO PARKINGLOT (parkingLotId, carspace) VALUES (?,?);",
			[pointID, carspace],
			function (err) {
				if (err)
					reject(err);
				resolve(
					// {
					// 	pLotId: this.lastID,
					// 	name: newPLot.name,
					// 	carspace: newPLot.carspace,
					// 	municipality: newPLot.municipality,
					// 	province: newPLot.province
					// }
				);
			})
	});
};

exports.deleteParkingLot = (id) => {
	return new Promise((resolve, reject) => {
		db.run(`DELETE FROM PARKINGLOT WHERE parkingLotId=${id}`, (err) => {
			if (err)
				reject(err);
			resolve();
		})
	});
};