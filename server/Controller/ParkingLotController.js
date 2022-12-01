const pLotDAO = require("../DAO/parkingLotDAO");
const pointsDAO = require("../DAO/pointsDAO");

exports.getAllParkingLots = async () => {
	const parkingLots = await pLotDAO.getAllParkingLots()
		.catch((err) => {
			throw err;
		});
	return parkingLots;
}

exports.getParkingLotById = async (id) => {
	const parkingLot = await pLotDAO.getParkingLotById(id).catch(() => {
		throw Error();
	});
	return parkingLot;
}

exports.parkingLotExists = async (pLotId) => {
	const exists = await pLotDAO.parkingLotExists(pLotId).catch(() => {
		throw Error();
	});
	return exists;
}

exports.addParkingLot = async (newPLot) => {

	let { name, latitude, longitude, municipality, province, address, carspace, creatorID } = newPLot


	let pointID;
	await pointsDAO.createPoint({
		name: name, latitude: Number(latitude), longitude: Number(longitude),
		address: address, municipality: municipality, province: province, type: "parkinglot", creatorID: Number(creatorID)
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

exports.deleteParkingLot = async (pLotId) => {
	await pointsDAO.deletePoint(pLotId)
		.catch(err => { throw err; });

	await pLotDAO.deleteParkingLot(pLotId)
		.catch(err => { throw err; });
}
