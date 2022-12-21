const pointsDAO = require("../DAO/pointsDAO");

exports.getAllPoints = async () => {
	const points = await pointsDAO.getAllPoints()

	return points;
}


exports.getPoint = async (pointID) => {
	const point = await pointsDAO.getPoint(pointID)

	return point;
}

exports.getHikePoints = async (hikeID) => {
	const points = await pointsDAO.getHikePoints(hikeID)

	return points;
}


