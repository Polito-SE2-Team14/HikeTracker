const hikeDAO = require("../DAO/hikeDAO");

class HikeController {
	constructor() {
		//console.log("Controller started");
	}

	async getAllHikes() {
		const hikes = await hikeDAO.getAllHikes().catch(() => {
			throw Error();
		});
		return hikes;
	}

	async getHike(hikeID) {
		const hike = await hikeDAO.getHike(hikeID).catch(() => {
			throw Error();
		});

		return hike;
	}

	async addHike(hike) {
		const addedHike = await hikeDAO.addHike(hike).catch((err) => {
			throw err;
		});

		return addedHike;
	}

	async updateHike(hike) {
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

	async deleteHike(hikeID) {
		try {
			let msg = await hikeDAO.deleteHike(hikeID);
			return msg;
		} catch (err) {
			return err;
		}
	}

	async setStart(hikeID, startPointID) {
		await hikeDAO.setStart(hikeID, startPointID)
			.catch(err => {throw err})
	
		return
	}

	async setEnd(hikeID, endPointID) {
		await hikeDAO.setEnd(hikeID, endPointID)
			.catch(err => {throw err})
	
		return
	}F
}
module.exports = HikeController;
