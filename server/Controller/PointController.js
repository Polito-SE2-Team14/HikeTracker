const pointsDAO = require("../DAO/pointsDAO");
//const Hut = require("../Class/Hut");
class PointController {
	constructor() {
		console.log("Controller started");
	}

	async getHuts() {
		const huts = await pointsDAO.getHuts().catch(() => {
			throw Error();
		});

		return huts;
	}

	async getPoint(pointID) {
		const point = await pointsDAO.getPoint(pointID).catch(() => {
			throw Error();
		});

		return point;
	}

	async getHikePoints(hikeID) {
		const points = await pointsDAO.getHikePoints(hikeID).catch(() => {
			throw Error();
		});

		return points;
	}

	async createHut(hut) {

		let { name, latitude, longitude, address, bedspace, hutOwnerID } = hut

		if (typeof name != "string"
			|| typeof latitude != "number"
			|| typeof longitude != "number"
			|| typeof address != "string"
			|| typeof bedspace != "number"
			|| typeof hutOwnerID != "number") {
			console.error("Error type");
			throw Error("Type")
		}

		let hutID;
		await pointsDAO.createPoint({ name: name, latitude: latitude, longitude: longitude, address: address, type: "hut" })
			.then(newID => hutID = newID)
			.catch(err => { console.error("controller:", err); throw err });

		await pointsDAO
			.createHut({ hutID: hutID, bedspace: bedspace, hutOwnerID: hutOwnerID })
			.catch((err) => {
				console.error(err);
				throw err;
			});

		/* return new Hut(
			hutID,
			hut.name,
			hut.latitude,
			hut.longitude,
			hut.address,
			hut.bedspace,
			hut.hutOwnerID
		); */

		let hutToBeReturned = {
			hutID: hutID,
			name: hut.name,
			latitude: hut.latitude,
			longitude: hut.longitude,
			address: hut.address,
			bedspace: hut.bedspace,
			hutOwnerID: hut.hutOwnerID
		}
		return hutToBeReturned;
	}

	async updateHut(hut) {
		await pointsDAO.updatePoint(hut)
			.catch(err => { throw err })

		await pointsDAO.updateHut(hut)
			.catch(err => { throw err })
	}

	async deleteHut(hutID) {
		await pointsDAO.deleteHut(hutID)
			.catch(err => { throw err })

		await pointsDAO.deletePoint(hutID)
			.catch(err => { throw err })

		return
	}
}

module.exports = PointController;
