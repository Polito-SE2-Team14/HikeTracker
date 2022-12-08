const pointsDAO = require("../DAO/pointsDAO");

exports.getAllPoints = async () => {
	const points = await pointsDAO.getAllPoints().catch(() => {
		throw Error();
	})

	return points;
}


exports.getPoint = async (pointID) => {
	const point = await pointsDAO.getPoint(pointID)
		.catch((err) => { throw err });

	return point;
}

exports.getHikePoints = async (hikeID) => {
	const points = await pointsDAO.getHikePoints(hikeID).catch(() => {
		throw Error();
	});

	return points;
}


