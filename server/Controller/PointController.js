const pointsDAO = require('../DAO/pointsDAO');

class PointController {
    constructor() {
        console.log("Controller started")
    }

    async getPoint(pointID) {
        const point = await pointsDAO.getPoint(pointID)
            .catch(() => {throw Error()});
        
        return point;
        
    }

    async getHikePoints(hikeID) {
        const points = await pointsDAO.getHikePoints(hikeID)    
            .catch(() => {throw Error()});

        return points;
        
    }
}

module.exports = PointController