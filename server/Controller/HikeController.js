const hikeDAO = require("../DAO/hikeDAO");
const poinstDAO = require("../DAO/pointsDAO")

exports.getAllHikes = async () => {
	const hikes = await hikeDAO.getAllHikes()
		.catch(err => { throw err });
	return hikes;
}

exports.getHike = async (hikeID) => {
	const hike = await hikeDAO.getHike(hikeID)
		.catch(err => { throw err });
	return hike;
}

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

exports.addReferencePoint = async (hikeID, referencePoint) => {

	let referencePointID;
	await poinstDAO.createPoint(referencePoint)
		.then((id) => referencePointID = id)
		.catch((err) => {
			throw err;
		});
	
	await hikeDAO
		.addReferencePoint(hikeID, referencePointID)
		.then((msg) => {
			return msg;
		})
		.catch((err) => {
			throw err;
		});
}

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

exports.deleteHike = async (hikeID) => {
	try {
		let msg = await hikeDAO.deleteHike(hikeID);
		return msg;
	} catch (err) {
		return err;
	}
}

exports.getHikeTrack = async (hikeID) => {
	try {
		let track = await hikeDAO.getHikeTrack(hikeID);
		return track;
	} catch (err) {
		return err;
	}
}

exports.setStart = async (hikeID, startPointID) => {
	await hikeDAO.setStart(hikeID, startPointID)
		.catch(err => { throw err })
}

exports.setEnd = async (hikeID, endPointID) => {
	await hikeDAO.setEnd(hikeID, endPointID)
		.catch(err => { throw err })
}
