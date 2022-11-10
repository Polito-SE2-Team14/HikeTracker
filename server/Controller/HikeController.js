
const hikeDAO = require('../DAO/hikeDAO')

class HikeController {
    constructor() {
        console.log("Controller started")
    }

    async getAllHikes() {
        const hikes = await hikeDAO.getAllHikes()
            .catch(() => { throw Error() });
        
        return hikes;
    }

    async getHike(hikeID) {
        const hike = await hikeDAO.getHike(hikeID)
            .catch(() => {throw Error() });
        
        return hike;
    }

    async addHike(hike) {
        await hikeDAO.addHike(hike)
            .then(() => { return hike })
            .catch(() => { throw Error() })
    }

    async updateHike(hike) {
        hikeDAO.updateHike(hike)
            .then(() => hike)
            .catch(err => { throw Error() })
    }



}
module.exports = HikeController