const Point = require("./Point");

class Hut extends Point {
    constructor(hutID, name, latitude, longitude, address, bedspace, hutOwnerID) {
        super(hutID, name, latitude, longitude, address, "hut");
        this.bedspace = bedspace;
        this.hutOwnerID = hutOwnerID;
    }
}

module.exports = Hut