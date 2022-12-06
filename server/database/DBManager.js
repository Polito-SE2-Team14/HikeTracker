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

}

module.exports = DBManager