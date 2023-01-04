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
		const sql = `SELECT pointID, P.name, carspace, municipality, province, country,
		pointType, altitude, latitude, longitude, address, creatorID, U.name as creatorName, surname 
		FROM POINT P, PARKINGLOT PA, USER U
		WHERE P.pointID = PA.parkingLotId
		AND pointType = 'parkinglot'
		AND U.userID = P.creatorID`
		db.all(sql, (err, rows) => {
			if (err) {
				console.error(err)
				reject(err);
			}
			const pLots = rows.map(r => {
				return {
					pLotId: r.pointID,
					name: r.name,
					carspace: r.carspace,
					municipality: r.municipality,
					province: r.province,
					country: r.country,
					altitude: r.altitude,
					latitude: r.latitude,
					longitude: r.longitude,
					address: r.address,
					pointType: r.pointType,
					creatorID: r.creatorID,
					creatorName: r.creatorName,
					creatorSurname: r.surname
				}
			});
			resolve(pLots);
		});
	});
};

exports.getParkingLotById = (id) => {
	return new Promise((resolve, reject) => {
		db.get(`SELECT * FROM PARKINGLOT WHERE parkingLotId=${id}`, (err, row) => {
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