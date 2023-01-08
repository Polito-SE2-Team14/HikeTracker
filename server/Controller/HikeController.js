const hikeDAO = require("../DAO/hikeDAO");
const userDAO = require("../DAO/UserDAO");
const poinstDAO = require("../DAO/pointsDAO")

exports.getAllHikes = async () => {
	const hikes = await hikeDAO.getAllHikes()
		.catch(err => { throw err });
	return hikes;
}

exports.getHike = async (hikeID) => {


	let hike;
	await hikeDAO.getHike(hikeID)
		.then(h => hike = h)
	return hike;
}

exports.getCloseHutsForHike = async (hikeID) => {
	if (isNaN(hikeID))
		throw Error("Type error with hikeID")
	const huts = await hikeDAO.getCloseHutsForHike(hikeID)
	return huts;
}

exports.linkHutToHike = async (hutID, hikeID) => {
	if (isNaN(hutID))
		throw Error("Type error with hutID")
	if (isNaN(hikeID))
		throw Error("Type error with hikeID")
	const addedLink = await hikeDAO.linkHutToHike(hutID, hikeID)
	return addedLink;
}

exports.getHutsLinkedToHike = async (hikeID) => {
	if (isNaN(hikeID))
		throw Error("Type error with hikeID")
	const hutIDs = await hikeDAO.getHutsLinkedToHike(hikeID)
	return hutIDs;
}

exports.deleteHutToHikeLink = async (hutID, hikeID) => {
	if (isNaN(hutID))
		throw Error("Type error with hutID")
	if (isNaN(hikeID))
		throw Error("Type error with hikeID")

	const removedLink = await hikeDAO.deleteHutToHikeLink(hutID, hikeID)
	return removedLink;
}

exports.getReferencePointsForHike = async (hikeID) => {

	const points = await hikeDAO.getReferencePointsForHike(hikeID)
	return points;
}

exports.addHike = async (hike) => {

	let { title, length, ascent, expectedTime, description, country, municipality, province, difficulty, creatorID } = hike

	if (typeof title != "string")
		throw Error("Type error with name")
	if (isNaN(length))
		throw Error("Type error with length")
	if (isNaN(ascent))
		throw Error("Type error with ascent")
	if (isNaN(expectedTime))
		throw Error("Type error with expectedTime")
	if (typeof description != "string")
		throw Error("Type error with description")
	if (typeof country != "string")
		throw Error("Type error with country");
	if (typeof municipality != "string")
		throw Error("Type error with municipality")
	if (typeof province != "string")
		throw Error("Type error with province")
	if (typeof difficulty != "string" || !["Tourist", "Hiker", "Professional Hiker"].includes(difficulty))
		throw Error("Type error with difficulty")
	if (isNaN(creatorID))
		throw Error("Type error with creatorID");

	let existedUser = await userDAO.getUserById(creatorID);
	if (!existedUser) {
		throw Error("User with this creatorID is not existed");
	}
	if (existedUser.type != "localGuide") {
		throw Error("User with this creatorID is not authorized");
	}
	//check on track

	const addedHike = await hikeDAO.addHike(hike)
	return addedHike;
}

exports.newHikeImage = async (hikeID, image) => {
	await hikeDAO.newImage(hikeID, image);

};

exports.addReferencePoint = async (hikeID, referencePoint) => {

	let hike
	await this.getHike(hikeID)
		.then(h => hike = h)
	if (hike == null)
		throw Error("There is no hike with that ID: " + hikeID)



	let referencePointID;
	await poinstDAO.createPoint(referencePoint)
		.then((id) => referencePointID = id)

	await hikeDAO
		.addReferencePoint(hikeID, referencePointID)

	return referencePointID
}

exports.updateHike = async (hike) => {
	await hikeDAO
		.updateHike(hike)
		.then((msg) => { return msg; })

	return hike;
}

exports.deleteHike = async (hikeID) => {

	if (isNaN(hikeID))
		throw Error("Type error with hikeID");

	await hikeDAO.deleteHike(hikeID)

}

exports.getHikeTrack = async (hikeID) => {
	const track = hikeDAO.getHikeTrack(hikeID)
	return track

}

exports.getHikeImage = async (hikeID) => {
	const image = hikeDAO.getHikeImage(hikeID);
	return { image: image };

}

exports.setStart = async (hikeID, startPointID) => {
	if (isNaN(hikeID))
		throw Error("Type error with hikeID")
	if (isNaN(startPointID))
		throw Error("Type error with hikeID")
	await hikeDAO.setStart(hikeID, startPointID)
}

exports.setEnd = async (hikeID, endPointID) => {
	if (isNaN(hikeID))
		throw Error("Type error with hikeID")
	if (isNaN(endPointID))
		throw Error("Type error with hikeID")
	await hikeDAO.setEnd(hikeID, endPointID)
}
