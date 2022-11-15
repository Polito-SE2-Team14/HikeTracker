
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
        const addedHike = await hikeDAO.addHike(hike)
            .catch(err => { throw err });

            return addedHike;
    }

    async updateHike(hike) {
        await hikeDAO.updateHike(hike)
            .then(msg => {return msg})
            .catch(err => { throw err })

        return hike;
    }



}
module.exports = HikeController