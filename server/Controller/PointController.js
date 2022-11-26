const pointsDAO = require("../DAO/pointsDAO");
//const Hut = require("../Class/Hut");
class PointController {
	constructor() {
		console.log("Controller started");
	}

	async getAllPoints() {
		const points = await pointsDAO.getAllPoints().catch(() => {
			throw Error();
		})

		return points;
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

		let pointID;
		await pointsDAO.createPoint({
			name: name, latitude: Number(latitude), longitude: Number(longitude),
			address: address, municipality: municipality, province: province, type: "hut"
		})
			.then(newID => pointID = newID)
			.catch(err => { console.error("controller:", err); throw err });

		await pointsDAO
			.createHut({ pointID: pointID, bedspace: Number(bedspace), hutOwnerID: Number(hutOwnerID) })
			.catch((err) => {
				console.error(err);
				throw err;
			});

		/* return new Hut(
			pointID,
			hut.name,
			hut.latitude,
			hut.longitude,
			hut.address,
			hut.bedspace,
			hut.hutOwnerID
		); */

		let hutToBeReturned = {
			pointID: pointID,
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

		await pointsDAO.updatePoint(hut)
			.catch(err => { throw err })

		await pointsDAO.updateHut(hut)
			.catch(err => { throw err })
	}

	async deleteHut(pointID) {
		await pointsDAO.deleteHut(pointID)
			.catch(err => { throw err })

		await pointsDAO.deletePoint(pointID)
			.catch(err => { throw err })

		return
	}
}

module.exports = PointController;
