class Hike {
    constructor(hikeID, title, lenght, expectedTime, ascent, difficulty, description) {
        this.hikeID = hikeID;
        this.title = title;
        this.lenght = lenght;
        this.expectedTime = expectedTime;
        this.ascent = ascent;
        this.difficulty = difficulty;
        this.description = description;
        this.startPointID = null;
        this.endPointID = null;
        this.referencePointIDs = [];
    }
}

module.exports = Hike