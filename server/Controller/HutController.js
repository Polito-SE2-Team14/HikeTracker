const pointsDAO = require("../DAO/pointsDAO");
const hutDAO = require("../DAO/hutDAO")

class HutController {
    constructor() {
        //console.log("ParkingLotController has started")
    }

    async getHuts() {
		const huts = await hutDAO.getHuts().catch(() => {
			throw Error();
		});

		return huts;
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

		
		await hutDAO
			.createHut({ pointID: pointID, bedspace: Number(bedspace), hutOwnerID: Number(hutOwnerID) })
			.catch((err) => {
				console.error(err);
				throw err;
			});

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

		await hutDAO.updateHut(hut)
			.catch(err => { throw err })
	}

	async deleteHut(pointID) {
		await hutDAO.deleteHut(pointID)
			.catch(err => { throw err })

		await pointsDAO.deletePoint(pointID)
			.catch(err => { throw err })

	}
}

module.exports = HutController