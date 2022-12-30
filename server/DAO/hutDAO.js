const Images = require('../database/images');
const Singleton = require("../database/DBManagerSingleton");
const DBManager = require("../database/DBManager");
/** @type {DBManager} */
const dbManager = Singleton.getInstance();
const db = dbManager.getDB();

exports.getHuts = () => {
	return new Promise((resolve, reject) => {
		const sql =
			`SELECT pointID, P.name, description, altitude, latitude, longitude, address, H.email, H.phoneNumber, H.website,
			pointType, bedspace, municipality, province, country, U.name AS creatorName, surname, creatorID 
		FROM POINT P, HUT H, USER U
		WHERE P.pointID = H.hutID AND pointType = 'hut'
		AND U.userID = P.creatorID`;
		db.all(sql, (err, rows) => {
			if (err) reject(err);
			let huts = rows.map((r) => {
				return {
					pointID: r.pointID, name: r.name, description: r.description,
					latitude: r.latitude, longitude: r.longitude,
					altitude: r.altitude,
					address: r.address, municipality: r.municipality, province: r.province, country: r.country,
					pointType: r.pointType, bedspace: r.bedspace,
					email: r.email, phoneNumber: r.phoneNumber, website: r.website,
					creatorID: r.creatorID, creatorName: r.creatorName, creatorSurname: r.surname,
				};
			});
			resolve(huts);
		});
	});
};

exports.getHutImage = hutID => Images.getImage(hutID, 'hut');

exports.createHut = (hut) => {
	return new Promise((resolve, reject) => {
		const sql = "INSERT INTO HUT (hutID, bedspace, email, website, phoneNumber) VALUES (?,?,?,?,?)";
		db.run(sql, [hut.pointID, hut.bedspace, hut.email, hut.website, hut.phoneNumber], function (err, row) {
			if (err) reject(err);
			resolve();
		});
	});
};

exports.newImage = (hutID, image) => Images.newImage(hutID, 'hut', image);

exports.updateHut = (hut) => {
	return new Promise((resolve, reject) => {
		const sql = "UPDATE HUT SET bedspace = ? WHERE hutID = ?";
		db.run(
			sql,
			[hut.bedspace, hut.pointID],
			function (err, row) {
				if (err) reject(err);
				resolve();
			}
		);
	});
};

exports.deleteHut = (pointID) => {
	return new Promise((resolve, reject) => {
		const sql = "DELETE FROM HUT WHERE hutID = ?";
		db.run(sql, [pointID], err => {
			if (err) reject(err);
			else try {
				Images.deleteImage(pointID, 'hut');
				resolve();
			}
			catch(e) {

			}
		});
	});
};
