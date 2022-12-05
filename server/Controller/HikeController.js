const hikeDAO = require("../DAO/hikeDAO");
const poinstDAO = require("../DAO/pointsDAO")


//TODO test this function
exports.getAllHikes = async () => {
	const hikes = await hikeDAO.getAllHikes()
		.catch(err => { throw err });
	return hikes;
}

//TODO test this function
exports.getHike = async (hikeID) => {
	const hike = await hikeDAO.getHike(hikeID)
		.catch(err => { throw err });
	return hike;
}

exports.getCloseHutsForHike=async(hikeID)=>{
	const huts = await hikeDAO.getCloseHutsForHike(hikeID)
		.catch(err=>{throw err});
	return huts;
}

exports.linkHutToHike=async(hutID,hikeID)=>{
	const addedLink = await hikeDAO.linkHutToHike(hutID,hikeID)
		.catch(err=>{throw err});
	return addedLink;
}

//TODO test this function
exports.getReferencePointsForHike = async (hikeID) => {
	const points = await hikeDAO.getReferencePointsForHike(hikeID)
		.catch(err => { throw err });
	return points;
}

exports.addHike = async (hike) => {

	let { title, length, ascent, expectedTime, description, municipality, province, difficulty } = hike
	//console.log(hike)

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
	if (typeof municipality != "string")
		throw Error("Type error with municipality")
	if (typeof province != "string")
		throw Error("Type error with province")
	if (typeof difficulty != "string" || !["Tourist", "Hiker", "Professional Hiker"].includes(difficulty))
		throw Error("Type error with difficulty")


	const addedHike = await hikeDAO.addHike(hike).catch((err) => {
		throw err;
	});

	return addedHike;
}

//TODO test this function
exports.addReferencePoint = async (hikeID, referencePoint) => {

	let hike
	this.getHike(hikeID)
		.then(h => hike = h)
	if (hike == null)
		throw Error("There is no hike with that ID")

	let referencePointID;
	await poinstDAO.createPoint(referencePoint)
		.then((id) => referencePointID = id)
		.catch((err) => {
			throw err;
		});

	await hikeDAO
		.addReferencePoint(hikeID, referencePointID)
		.catch((err) => {
			throw err;
		});

	return referencePointID
}

//TODO test this function
exports.updateHike = async (hike) => {
	await hikeDAO
		.updateHike(hike)
		.then((msg) => {
			return msg;
		})
		.catch((err) => {
			throw err;
		});

	return hike;
}

//TODO test this function
exports.deleteHike = async (hikeID) => {

	let hike
	await this.getHike(hikeDAO)
		.then(h => hike = h)

	if (hike == null)
		throw Error("There is no hike with that ID")

	await hikeDAO.deleteHike(hikeID)
		.catch(err => { console.error(err); throw err })
}

//TODO test this function
exports.getHikeTrack = async (hikeID) => {
	try {
		const track = hikeDAO.getHikeTrack(hikeID)
		return track
	}
	catch (err) {
		throw err
	}
}

//TODO test this function
exports.setStart = async (hikeID, startPointID) => {
	await hikeDAO.setStart(hikeID, startPointID)
		.catch(err => { console.error(err); throw err })
}

//TODO test this function
exports.setEnd = async (hikeID, endPointID) => {
	await hikeDAO.setEnd(hikeID, endPointID)
		.catch(err => { console.error(err); throw err })
}
