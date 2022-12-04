const path = require("path");
const sqlite = require('sqlite3');
const crypto = require('crypto');

class DBManager {

    #db;
    constructor(dbName) {
        // open the database
        this.#db = new sqlite.Database(path.join(__dirname, './' + dbName + ".sqlite"), (err) => {
            if (err) {
                console.error("error db manager", err)
                throw err;
            }
            //console.log(dbName + " started")
        });
    }

    getDB() {
        return this.#db
    }

    async clearDb() {
        //console.log("clearDB")
        let db = this.#db;
        return new Promise(function (resolve, reject) {
            db.run("DELETE FROM USER WHERE 1=1;")
            db.run("DELETE FROM POINT WHERE 1=1;")
            db.run("DELETE FROM HUT WHERE 1=1;")
            db.run("DELETE FROM PARKINGLOT WHERE 1=1;")
            db.run("DELETE FROM HIKEREFERENCEPOINT WHERE 1=1;")
            db.run("DELETE FROM HIKE WHERE 1=1;")
            db.run("DELETE FROM HIKELINKHUT WHERE 1=1;")
            resolve();

        })
    }

    async deleteAllHikes() {
        let db = this.#db;
        return new Promise(function (resolve, reject) {
            db.run(`DELETE FROM HIKE WHERE 1=1;`);
            resolve();
        })
    }

    async restoreOriginalHikes() {
        let db = this.#db;
        return new Promise(function (resolve, reject) {
            db.run(`INSERT INTO HIKE (hikeID, title, length, expectedTime, ascent, difficulty, 
                startPointID, endPointID, description, municipality, province) VALUES 
			(1, "hike#1", 7, 30, 100, "Tourist", 1, 4, "firstDescription", "Collegno", "Turin"), 
			(2, "hike#2", 2, 45, 123, "Hiker", 2, 5, "secondDescription","Collegno", "Turin"), 
			(3, "hike#3", 3, 60, 514, "Professional Hiker", 3, 6, "thirdDescription","Collegno", "Turin");`);
            console.log("done")
            resolve();
        })
    }

    async createDropTables(sql) {
        let db = this.#db;
        return new Promise((resolve, reject) => {
            db.run(sql, err => {
                if (err) { console.error(sql, err); reject(err); }
                else resolve();
            })
        })
    }


}

module.exports = DBManager