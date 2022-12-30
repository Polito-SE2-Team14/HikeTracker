const pointsDAO = require("../DAO/pointsDAO");
const hutDAO = require("../DAO/hutDAO")

//TODO test this function
exports.getHuts = async () => {
	const huts = await hutDAO.getHuts()

	return huts;
}

//TODO test this function
exports.getHutImage = async (hikeID) => {
	try {
		const image = hutDAO.getHutImage(hikeID);
		return image
	}
	catch (err) {
		throw err
	}
}

exports.createHut = async (hut) => {

	let { name, latitude, longitude, altitude, description,
		website, email, phoneNumber,
		municipality, province, address, bedspace, creatorID, country } = hut

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
	if (isNaN(creatorID))
		throw Error("Type error with creatorID")

	let pointID;
	await pointsDAO.createPoint({
		name: name, description: description,
		latitude: Number(latitude), longitude: Number(longitude), altitude: Number(altitude),
		country: country, address: address, municipality: municipality, province: province,
		type: "hut", creatorID: Number(creatorID)
	})
		.then(newID => pointID = newID)


	await hutDAO
		.createHut({
			pointID: pointID, bedspace: Number(bedspace),
			website: website, phoneNumber: phoneNumber, email: email
		})

	let hutToBeReturned = {
		pointID: pointID,
		name: hut.name,
		latitude: hut.latitude,
		longitude: hut.longitude,
		address: hut.address,
		bedspace: hut.bedspace,
		creatorID: hut.creatorID
	}
	return hutToBeReturned;
}

exports.newHutImage = async (hutID, image) => {
	try {
		hutDAO.newImage(hutID, image);
	}
	catch (e) {
		throw e;
	}
};

exports.updateHut = async (hut) => {

	let { name, latitude, longitude, municipality, province, address, bedspace, creatorID } = hut

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
	if (isNaN(creatorID))
		throw Error("Type error with creatorID")

	await pointsDAO.updatePoint(hut)

	await hutDAO.updateHut(hut)
}

//TODO test this function
exports.deleteHut = async (pointID) => {
	await hutDAO.deleteHut(pointID)

	await pointsDAO.deletePoint(pointID)

}
