const pointsDAO = require("../DAO/pointsDAO");
const hutDAO = require("../DAO/hutDAO")


exports.getHuts = async () => {
	const huts = await hutDAO.getHuts().catch(() => {
		throw Error();
	});

	return huts;
}

exports.createHut = async (hut) => {

	let { name, latitude, longitude, municipality, province, address, bedspace, creatorID, country } = hut

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
		throw Error("Type error with hutownerID")

	let pointID;
	await pointsDAO.createPoint({
		name: name, latitude: Number(latitude), longitude: Number(longitude), country: country,
		address: address, municipality: municipality, province: province, type: "hut", creatorID: Number(creatorID)
	})
		.then(newID => pointID = newID)
		.catch(err => { console.error("controller:", err); throw err });


	await hutDAO
		.createHut({ pointID: pointID, bedspace: Number(bedspace) })
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

exports.updateHut = async (hut) => {

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

exports.deleteHut = async (pointID) => {
	await hutDAO.deleteHut(pointID)
		.catch(err => { throw err })

	await pointsDAO.deletePoint(pointID)
		.catch(err => { throw err })

}
