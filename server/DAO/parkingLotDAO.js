const sqlite = require("sqlite3");
const fs = require("fs");

const Singleton = require("../database/DBManagerSingleton");
const DBManager = require("../database/DBManager");
const { captureRejectionSymbol } = require("events");
/** @type {DBManager} */
const dbManager = Singleton.getInstance();
const db = dbManager.getDB();

exports.getAllParkingLots=()=>{
	return new Promise((resolve, reject) => {
		db.all("SELECT * FROM PARKING_LOTS",(err,rows)=>{
			if(err){
				reject(err);
				return;
			}
			const pLots=rows.map(r=>{
				return{
					pLotId: r.pLotId,
					carspaces: r.carspaces,
					municipality: r.municipality,
					province: r.province
				}
			});
			resolve(pLots);
		});
	});
};

exports.getParkingLotById=(id)=>{
	return new Promise((resolve, reject) => {
		db.get(`SELECT * FROM PARKING_LOTS WHERE pLotId=${id}`,(err,row)=>{
			if(err){
				reject(err);
				return;
			}
			if(row==undefined){
				reject("No parking lot has the given id");
				return;
			}
			resolve(row);
		});
	});
};

exports.parkingLotExists=(id)=>{
	return new Promise((resolve, reject) => {
		db.get(`SELECT * FROM PARKING_LOTS WHERE pLotId=${id}`,(err,row)=>{
			if(err){
				reject(err);
				return;
			}
			resolve(row!==undefined);
		});
	});
};

exports.addParkingLot=(newPLot)=>{
	return new Promise((resolve, reject) => {
		db.run(`INSERT INTO PARKING_LOTS (carspaces,municipality,province) VALUES (${newPLot.carspaces},${newPLot.municipality},${newPLot.province})`,function(err){
			if(err){
				reject(err);
				return;
			}
			resolve({
				pLotId: this.lastID,
				carspaces: newPLot.carspaces,
				municipality: newPLot.municipality,
				province: newPLot.province
			});
		})
	});
};

exports.deleteParkingLot=(id)=>{
	return new Promise((resolve, reject) => {
		db.run(`DELETE FROM PARKING_LOTS WHERE pLotID=${id}`,(err)=>{
			if(err){
				reject(err);
				return;
			}
			resolve();
		})
	});
};