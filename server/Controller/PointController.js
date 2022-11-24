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

		let { name, latitude, longitude, municipality, province, address, bedspace, hutOwnerID } = hut

		if (typeof name != "string")
			throw Error("Type error with name")
		if (isNaN(latitude))
			throw Error("Type error with latitude")
		if (isNaN(longitude))
			throw Error("Type error with longitude")
		if (typeof address != "string")
			throw Error("Type error with address")
		if (typeof municipality != "string")
			throw Error("Type error with address")
		if (typeof province != "string")
			throw Error("Type error with address")
		if (isNaN(bedspace))
			throw Error("Type error with bedspace")
		if (isNaN(hutOwnerID))
			throw Error("Type error with hutownerID")

		let hutID;
		await pointsDAO.createPoint({
			name: name, latitude: Number(latitude), longitude: Number(longitude),
			address: address, municipality: municipality, province: province, type: "hut"
		})
			.then(newID => hutID = newID)
			.catch(err => { console.error("controller:", err); throw err });

		await pointsDAO
			.createHut({ hutID: hutID, bedspace: Number(bedspace), hutOwnerID: Number(hutOwnerID) })
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
