const pointsDAO = require("../DAO/pointsDAO");
const Hut = require("../Class/Hut");
class PointController {
	constructor() {
		console.log("Controller started");
	}

	async getHuts() {
		const huts = await pointsDAO.getHuts().catch(() => {
			throw Error();
		});

		return huts;
	}

	async getPoint(pointID) {
		const point = await pointsDAO.getPoint(pointID).catch(() => {
			throw Error();
		});

		return point;
	}

	async getHikePoints(hikeID) {
		const points = await pointsDAO.getHikePoints(hikeID).catch(() => {
			throw Error();
		});

		return points;
	}

    async createHut(hut) {
        let hutID;
        //console.log("hut:", hut)
        await pointsDAO.createPoint(hut.name, Number(hut.latitude), Number(hut.longitude), hut.address)
            .then(newID => hutID = newID)
            .catch(err => { console.log("controller:",err); throw err });

		await pointsDAO
			.createHut(hutID, Number(hut.bedspace), Number(hut.hutOwnerID))
			.catch((err) => {
				console.log(err);
				throw err;
			});

		return new Hut(
			hutID,
			hut.name,
			hut.latitude,
			hut.longitude,
			hut.address,
			hut.bedspace,
			hut.hutOwnerID
		);
	}
}

module.exports = PointController;
