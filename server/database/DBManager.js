const sqlite = require('sqlite3');
const crypto = require('crypto');

class DBManager {

    #db;
    constructor(dbName) {
        // open the database
        this.#db = new sqlite.Database('./database/' + dbName + ".sqlite", (err) => {
            if (err) {
                console.log("error db manager", err)
                throw err;
            }
            console.log(dbName + " started")
        });
    }

    getDB() {
        return this.#db
    }

    async clearDb() {
        let db = this.#db;
        return new Promise(function (resolve, reject) {
            db.run("DELETE FROM USER WHERE 1=1;")
            db.run("DELETE FROM POINT WHERE 1=1;")
            db.run("DELETE FROM HUT WHERE 1=1;")
            db.run("DELETE FROM PARKINGLOT WHERE 1=1;")
            db.run("DELETE FROM HIKEREFERENCEPOINT WHERE 1=1;")
            db.run("DELETE FROM HIKE WHERE 1=1;")
            db.run("DELETE FROM HIKEGROUP WHERE 1=1;")
            db.run("DELETE FROM HIKEGROUPMEMBER WHERE 1=1;")
            db.run("DELETE FROM HUTWORKER WHERE 1=1;")
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
            db.run(`INSERT INTO HIKE (hikeID, title, length, expectedTime, ascent, difficulty, startPointID, endPointID, description) VALUES 
			(1, "hike#1", 7, 30, 100, "Tourist", 1, 4, "firstDescription"), 
			(2, "hike#2", 2, 45, 123, "Hiker", 2, 5, "secondDescription"), 
			(3, "hike#3", 3, 60, 514, "Professional Hiker", 3, 6, "thirdDescription");`);
            resolve();
        })
    }

    async populateUser(users) {
        let db = this.#db;
        let sql = 'INSERT INTO USER VALUES(?, ?, ?, ?, ?, ?, ?, ?)';

        return Promise.all(users.map(user =>
            new Promise((resolve, reject) => {
                let salt = crypto.randomBytes(16);

                crypto.scrypt(user.pwd, salt, 32, (err, hp) => {
                    if (err) reject(err);
                    else {
                        user.salt = salt.toString('base64');
                        user.pwd = hp.toString('base64');

                        resolve(user);
                    }
                });
            })
        )).then(res => Promise.all(res.map(user =>
            new Promise((resolve, reject) =>
                db.run(sql, [user.id, user.name, user.surname, user.email, user.pn, user.type, user.salt, user.pwd], err => {
                    if (err) reject(err);
                    else resolve();
                })
            )
        ))).catch(err => { throw err });
    }
}

module.exports = DBManager