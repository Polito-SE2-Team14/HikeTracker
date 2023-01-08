const { unlink, writeFileSync, readdir } = require('fs');
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
        return this.#db;
    }

    deleteFiles(dir, files) {
        if (files.length)
            for (const file of files)
                if (file != '.gitkeep')
                    unlink(path.join(dir, file), (err) => { });

    };

    async deleteAllFiles() {
        let trkDir = path.resolve(__dirname + '/tracks');
        let hikeImgDir = path.resolve(__dirname + '/images/hikes');
        let hutImgDir = path.resolve(__dirname + '/images/huts');

        readdir(trkDir, (err, files) => this.deleteFiles(trkDir, files));
        readdir(hikeImgDir, (err, files) => this.deleteFiles(hikeImgDir, files));
        readdir(hutImgDir, (err, files) => this.deleteFiles(hutImgDir, files));
    };

    async clearDb() {
        //console.log("clearDB")
        let db = this.#db;

        await this.deleteAllFiles();

        return new Promise((resolve, reject) => {
            db.run("DELETE FROM USER WHERE 1=1;")
            db.run("DELETE FROM HIKE WHERE 1=1;")
            db.run("DELETE FROM HUT WHERE 1=1;")
            db.run("DELETE FROM POINT WHERE 1=1;")
            db.run("DELETE FROM PARKINGLOT WHERE 1=1;")
            db.run("DELETE FROM USER_STATS WHERE 1=1;")
            db.run("DELETE FROM HIKEREFERENCEPOINT WHERE 1=1;")
            db.run("DELETE FROM HIKELINKHUT WHERE 1=1;")
            db.run("DELETE FROM USERHIKERECORDS WHERE 1=1;")

            resolve();
        });
    }

    /* async restoreOriginalHikes() {
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
    } */

    async createDropTables(sql) {
        let db = this.#db;
        return new Promise((resolve, reject) => {
            db.run(sql, err => {
                if (err) { console.error(sql, err); reject(err); }
                else resolve();
            })
        })
    }

    async addHikes(insertTrack = true) {
        const db = this.#db;

        const sql = 'INSERT INTO Hike VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 6)';
        const tracks = [
            [
                [46.02348, 7.74796],
                [46.0239, 7.74824],
                [46.02394, 7.74826]
            ],
            [
                [45.91284, 8.38543],
                [45.91274, 8.38543],
                [45.91274, 8.38541]
            ],
            [
                [45.95929, 8.44804],
                [45.95929, 8.44804],
                [45.95927, 8.44812]
            ]
        ];
        const image = 'data:image/jpeg;base64/adugfasjdfbsfjkvafigafuiagewfibasalfbsiuufgsbvnlkbkvuiegfoegfsvsk';

        let i = 0;
        const hikes = [
            [++i, `hike#${i}`, 500, 30, 250, 'Tourist', 1, 4, `description#${i}`, 'Collegno', 'Turin', 'Italy',],
            [++i, `hike#${i}`, 750, 45, 375, 'Hiker', 2, 5, `description#${i}`, 'Collegno', 'Turin', 'Italy',],
            [++i, `hike#${i}`, 1000, 60, 500, 'Professional Hiker', 3, 6, `description#${i}`, 'Collegno', 'Turin', 'Italy',]
        ];

        return Promise.all(hikes.map(hike =>
            new Promise((resolve, reject) => {
                db.run(sql, hike, err => {
                    let res = {
                        hikeID: hike[0],
                        title: hike[1],
                        length: hike[2],
                        expectedTime: hike[3],
                        ascent: hike[4],
                        difficulty: hike[5],
                        startPointID: hike[6],
                        endPointID: hike[7],
                        description: hike[8],
                        municipality: hike[9],
                        province: hike[10],
                        country: hike[11],
                        creatorID: 6,
                        creatorName: 'Mario',
                        creatorSurname: 'Rossi'
                    };

                    if (insertTrack) {
                        let file = path.resolve(__dirname + `/tracks/_${hike[0]}_.trk`);
                        writeFileSync(file, JSON.stringify(tracks[hike[0] - 1]), { flag: 'w', encoding: 'utf8' });
                        res.track = tracks[hike[0] - 1];
                    }

                    let imageFile = path.resolve(__dirname + `/images/hikes/_${hike[0]}_.img`);
                    writeFileSync(imageFile, JSON.stringify(image), { flag: 'w', encoding: 'utf8' });

                    resolve(res);
                });
            })
        ));
    }

    async addHuts() {
        const db = this.#db;

        const pointSql = 'INSERT INTO Point VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 6)'
        const hutSql = 'INSERT INTO Hut VALUES(?, ?, ?, ?, ?)';

        const image = 'data:image/jpeg;base64/adugfasjdfbsfjkvafigafuiagewfibasalfbsiuufgsbvnlkbkvuiegfoegfsvsk';

        let i = 0;
        const huts = [
            {
                point: [++i, `hut#${i}`, `description#${i}`, 100, 45.95233, 8.4457, `address#${i}`, 'Collegno', 'Turin', 'Italy', 'hut'],
                hut: [i, 50, '123456789', 'www.website.com', 'hut@mail.com']
            },
            {
                point: [++i, `hut#${i}`, `description#${i}`, 100, 45.95663, 8.45105, `address#${i}`, 'Collegno', 'Turin', 'Italy', 'hut'],
                hut: [i, 45, '123456789', 'www.website.com', 'hut@mail.com']
            },
            {
                point: [++i, `hut#${i}`, `description#${i}`, 100, 45.9461, 8.46432, `address#${i}`, 'Collegno', 'Turin', 'Italy', 'hut'],
                hut: [i, 70, '123456789', 'www.website.com', 'hut@mail.com']
            }
        ];

        return Promise.all(huts.map(hut =>
            new Promise((resolve, reject) =>
                db.run(pointSql, hut.point, err => resolve())
            ).then(() =>
                new Promise((resolve, reject) =>
                    db.run(hutSql, hut.hut, err => {
                        let imageFile = `./images/huts/_${hut.point[0]}_.img`;
                        writeFileSync(imageFile, JSON.stringify(image), { flag: 'w', encoding: 'utf8' });

                        resolve({
                            pointID: hut.point[0],
                            name: hut.point[1],
                            description: hut.point[2],
                            altitude: hut.point[3],
                            latitude: hut.point[4],
                            longitude: hut.point[5],
                            address: hut.point[6],
                            municipality: hut.point[7],
                            province: hut.point[8],
                            country: hut.point[9],
                            pointType: hut.point[10],
                            bedspace: hut.hut[1],
                            phoneNumber: hut.hut[2],
                            website: hut.hut[3],
                            email: hut.hut[4],
                            creatorID: 6,
                            creatorName: 'Mario',
                            creatorSurname: 'Rossi',
                        })
                    })
                )
            )
        ));
    }

    async linkHutsToHike() {
        const db = this.#db;

        const sql = 'INSERT INTO HikeLinkHut VALUES(3, ?)';
        const ids = [1, 2, 3];

        return Promise.all(ids.map(id =>
            new Promise((resolve, reject) =>
                db.run(sql, [id], err => resolve(id))
            )
        ));
    }

    async addReferencePoints() {
        const db = this.#db;

        const pointSql = 'INSERT INTO Point VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 6)'
        const refSql = 'INSERT INTO HikeReferencePoint VALUES(1, ?)';

        let i = 3;
        const ref = [
            [++i, `hut#${i}`, `description#${i}`, 100, 46.02348, 7.74796, `address#${i}`, 'Collegno', 'Turin', 'Italy', 'generic'],
            [++i, `hut#${i}`, `description#${i}`, 100, 46.0239, 7.74824, `address#${i}`, 'Collegno', 'Turin', 'Italy', 'generic'],
            [++i, `hut#${i}`, `description#${i}`, 100, 46.02394, 7.74826, `address#${i}`, 'Collegno', 'Turin', 'Italy', 'generic']
        ];

        return Promise.all(ref.map(p =>
            new Promise((resolve, reject) =>
                db.run(pointSql, p, err => resolve())
            ).then(() =>
                new Promise((resolve, reject) =>
                    db.run(refSql, [p[0]], err => resolve({
                        pointID: p[0],
                        name: p[1],
                        description: p[2],
                        altitude: p[3],
                        latitude: p[4],
                        longitude: p[5],
                        address: p[6],
                        municipality: p[7],
                        province: p[8],
                        country: p[9],
                        pointType: p[10],
                        creatorID: 6,
                        creatorName: 'Mario',
                        creatorSurname: 'Rossi',
                    }))
                )
            )
        ));
    }

    async addUsers() {
        const db = this.#db;

        let pass;
        let salt = crypto.randomBytes(16).toString('hex');
        crypto.scrypt('password'.toString('hex'), salt, 16, (err, hashedPass) => {
            pass = hashedPass.toString('hex');
        });
        //`(userID, name, surname, email, phoneNumber, type, salt, hashedPassword, verified, approved, token)`

        const sql = `INSERT INTO User VALUES(?, ?, ?, "ex@email.com", "1234567890", ?, ?, ?, ?, ?, null)`;
        let users = [
            [1, 'Antonio', 'Bianchi', 'hiker', salt, pass, 0, 0],
            [2, 'Barbara', 'Ann', 'hiker', salt, pass, 1, 0],
            [3, 'Andrew', 'Miller', 'hiker', salt, pass, 1, 1],
            [4, 'John', 'Smith', 'localGuide', salt, pass, 0, 0],
            [5, 'Walter', 'Verdi', 'localGuide', salt, pass, 1, 0],
            [6, 'Mario', 'Rossi', 'localGuide', salt, pass, 1, 1],
            [7, 'Weather', 'Report', 'hutWorker', salt, pass, 0, 0],
            [8, 'Anasui', 'Narciso', 'hutWorker', salt, pass, 1, 0],
            [9, 'Foo', 'Fighters', 'hutWorker', salt, pass, 1, 1],
            [10, 'Jotaro', 'Kujo', 'manager', salt, pass, 1, 1]
        ];

        return Promise.all(users.map(user =>
            new Promise((resolve, reject) => {
                db.run(sql, user, err => resolve(err));
            })
        ));
    }
}

module.exports = DBManager