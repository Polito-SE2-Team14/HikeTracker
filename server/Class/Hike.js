class Hike {
    constructor(hikeID, title, lenght, expectedTime, ascent, difficulty, description, startPointID, endPointID) {
        this.hikeID = hikeID;
        this.title = title;
        this.lenght = lenght;
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