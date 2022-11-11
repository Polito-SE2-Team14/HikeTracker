class Point {
    constructor(pointID, name, latitude, longitude, address, pointType) {
        this.pointID = pointID;
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
        this.address = address;
        this.pointType = pointType;
    }
}

module.exports = Point;