const Point = require("./Point");

class ParkingLot extends Point {
    constructor(parkingLotID, name, latitude, longitude, address, carspace) {
        super(parkingLotID, name, latitude, longitude, address, "parkingLot");
        this.carspace = carspace;
    }
}

module.exports = ParkingLot