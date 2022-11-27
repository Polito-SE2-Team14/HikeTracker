const pLotDAO = require("../DAO/parkingLotDAO");
const pointsDAO = require("../DAO/pointsDAO");

class ParkingLotController {
	constructor() { }

	async getAllParkingLots() {
		const parkingLots = await pLotDAO.getAllParkingLots()
			.catch((err) => {
				throw err;
			});
		return parkingLots;
	}

	async getParkingLotById(id) {
		const parkingLot = await pLotDAO.getParkingLotById(id).catch(() => {
			throw Error();
		});
		return parkingLot;
	}

	async parkingLotExists(pLotId) {
		const exists = await pLotDAO.parkingLotExists(pLotId).catch(() => {
			throw Error();
		});
		return exists;
	}

	async addParkingLot(newPLot) {

		let { name, latitude, longitude, municipality, province, address, carspace } = newPLot


		let pointID;
		await pointsDAO.createPoint({
			name: name, latitude: Number(latitude), longitude: Number(longitude),
			address: address, municipality: municipality, province: province, type: "parkinglot"
		})
			.then(newID => pointID = newID)
			.catch(err => { console.error("controller:", err); throw err });


		await pLotDAO.addParkingLot(pointID, carspace)
			.catch((err) => { throw err; });

		const addedPLot =
		{
			pointID: pointID,
			name: newPLot.name,
			latitude: newPLot.latitude,
			longitude: newPLot.longitude,
			address: newPLot.address,
			carspace: newPLot.carspace
		}

		return addedPLot;
	}

	async deleteParkingLot(pLotId) {
		await pointsDAO.deletePoint(pLotId)
			.catch(err => { throw err; });

		await pLotDAO.deleteParkingLot(pLotId)
			.catch(err => { throw err; });
	}
}
module.exports = ParkingLotController;