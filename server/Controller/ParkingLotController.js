const pLotDAO = require("../DAO/parkingLotDAO");
const pointsDAO = require("../DAO/pointsDAO");

//TODO test this function
exports.getAllParkingLots = async () => {
	const parkingLots = await pLotDAO.getAllParkingLots()
		.catch((err) => {
			throw err;
		});
	return parkingLots;
}

//TODO test this function
exports.getParkingLotById = async (id) => {
	const parkingLot = await pLotDAO.getParkingLotById(id).catch(() => {
		throw Error();
	});
	return parkingLot;
}

//TODO test this function
exports.parkingLotExists = async (pLotId) => {
	const exists = await pLotDAO.parkingLotExists(pLotId).catch(() => {
		throw Error();
	});
	return exists;
}

//TODO test this function
exports.addParkingLot = async (newPLot) => {

	let { name, altitude, latitude, longitude, municipality, province, address,
		description, carspace, creatorID, country } = newPLot


	let pointID;
	await pointsDAO.createPoint({
		name: name, country: country, municipality: municipality, province: province, 
		latitude: Number(latitude), longitude: Number(longitude), altitude: Number(altitude),
		address: address, type: "parkinglot", creatorID: Number(creatorID), description: description
	})
		.then(newID => pointID = newID)
		.catch(err => { console.error("controller:", err); throw err });


	await pLotDAO.addParkingLot(pointID, carspace)
		.catch((err) => { throw err; });

	const addedPLot =
	{
		pointID: pointID,
		name: name,
		latitude: latitude,
		longitude: longitude,
		address: address,
		carspace: carspace
	}

	return addedPLot;
}

//TODO test this function
exports.deleteParkingLot = async (pLotId) => {
	await pointsDAO.deletePoint(pLotId)
		.catch(err => { throw err; });

	await pLotDAO.deleteParkingLot(pLotId)
		.catch(err => { throw err; });
}
