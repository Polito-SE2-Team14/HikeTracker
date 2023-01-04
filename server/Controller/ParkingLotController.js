const pLotDAO = require("../DAO/parkingLotDAO");
const pointsDAO = require("../DAO/pointsDAO");

//TODO test this function
exports.getAllParkingLots = async () => {
	const parkingLots = await pLotDAO.getAllParkingLots()
		
	return parkingLots;
}

//TODO test this function
exports.getParkingLotById = async (id) => {
	const parkingLot = await pLotDAO.getParkingLotById(id)

	return parkingLot;
}

//TODO test this function
exports.parkingLotExists = async (pLotId) => {
	const exists = await pLotDAO.parkingLotExists(pLotId)

	return exists;
}

exports.addParkingLot = async (newPLot) => {
	let { name, altitude, latitude, longitude, municipality, province, address,
		description, carspace, creatorID, country } = newPLot

	if (typeof name != "string")
		throw Error("Type error with name")
	if (isNaN(altitude) & altitude!=null & altitude!=undefined)
		throw Error("Type error with altitude")
	if (isNaN(latitude))
		throw Error("Type error with latitude")
	if (isNaN(longitude))
		throw Error("Type error with longitude")
	if (typeof municipality != "string")
		throw Error("Type error with municipality")
	if (typeof province != "string")
		throw Error("Type error with province")
	if (typeof address != "string")
		throw Error("Type error with address")
	if (typeof description != "string" & description!=null & description!=undefined)
		throw Error("Type error with description")
	if (isNaN(carspace))
		throw Error("Type error with carspace")
	if (isNaN(creatorID))
		throw Error("Type error with creatorID")
	if (typeof country != "string")
		throw Error("Type error with country")

	let pointID;
	await pointsDAO.createPoint({
		name: name, country: country, municipality: municipality, province: province, 
		latitude: Number(latitude), longitude: Number(longitude), altitude: Number(altitude),
		address: address, type: "parkinglot", creatorID: Number(creatorID), description: description
	})
		.then(newID => pointID = newID)

	await pLotDAO.addParkingLot(pointID, carspace)

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

	await pLotDAO.deleteParkingLot(pLotId)
}
