class Hike {
    constructor(hikeID, title, length, expectedTime, ascent, difficulty, description, startPointID, endPointID) {
        this.hikeID = hikeID;
        this.title = title;
        this.lenght = length;
        this.expectedTime = expectedTime;
        this.ascent = ascent;
        this.difficulty = difficulty;
        this.description = description;
        this.startPointID = startPointID;
        this.endPointID = endPointID;
        this.referencePointIDs = [];
    }
}

module.exports = Hike