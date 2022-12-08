const Singleton = require("../database/DBManagerSingleton")
const DBManager = require("../database/DBManager");
/** @type {DBManager} */
const dbManager = Singleton.getInstance();
const db = dbManager.getDB();

exports.getAllPoints = () => new Promise((resolve, reject) => {
    const sql = `SELECT pointID, P.name, latitude, longitude, province, municipality, country,
                address, pointType, creatorID, U.name AS creatorName,  U.surname AS creatorSurname
                FROM POINT P, USER U
                WHERE U.userID = P.creatorID`;

    db.all(sql, [], (err, rows) => {
        if (err)
            reject(err);

        const points = rows.map(row => {
            return {
                pointID: row.pointID, name: row.name, latitude: row.latitude, province: row.province, municipality: row.municipality,
                country: row.country, longitude: row.longitude, address: row.address, pointType: row.pointType, creatorID: row.creatorID,
                creatorName: row.creatorName, creatorSurname: row.creatorSurname, description: row.description
            }
        });
        resolve(points);
    })
});

exports.getPoint = (pointID) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT pointID, P.name, latitude, longitude, province, municipality, country,
                address, pointType, creatorID, U.name AS creatorName,  U.surname AS creatorSurname
                FROM POINT P, USER U
                WHERE U.userID = P.creatorID 
                AND pointID = ?`;
        const params = [pointID];
        db.get(sql, params, (err, row) => {
            if (err)
                reject(err);

            resolve({
                pointID: row.pointID, name: row.name, latitude: row.latitude, province: row.province, municipality: row.municipality,
                country: row.country, longitude: row.longitude, address: row.address, pointType: row.pointType, creatorID: row.creatorID,
                creatorName: row.creatorName, creatorSurname: row.creatorSurname, description: row.description
            });
        })
    });
}

exports.getHikePoints = (hikeID) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM HIKEREFERENCEPOINT HR INNER JOIN POINT P ON HR.referencePointId = P.pointID WHERE HR.hikeId=?";
        const params = [hikeID];

        db.all(sql, params, (err, rows) => {
            if (err)
                reject(err)
            const points = rows.map((p) => {
                return {
                    pointID: p.pointID, name: p.name, latitude: p.latitude, longitude: p.longitude, description: p.description,
                    municipality: p.municipality, province: p.province, address: p.address, pointType: p.pointType,
                }
            }
            );
            resolve(points);
        })
    });
}


exports.createPoint = (point) => {
    return new Promise((resolve, reject) => {

        let { name, description, latitude, longitude, altitude,
            municipality, province, country, address, type, creatorID } = point

        // console.log("point", point)

        const sql = `INSERT INTO POINT 
        (name, description, latitude, longitude, altitude, municipality, 
            province, country, address, pointType, creatorID)
             VALUES (?,?,?,?,?,?,?,?,?,?,?)`;
        db.run(sql,
            [name, description, latitude, longitude, altitude, municipality,
                province, country, address, type, creatorID],
            function (err, row) {
                if (err)
                    reject(err);
                resolve(this.lastID);
            })
    });
}

exports.deletePoint = (pointID) => {
    return new Promise((resolve, reject) => {
        const sql = "DELETE FROM POINT WHERE pointID = ?";
        db.run(sql, [pointID], function (err, row) {
            if (err)
                reject(err);
            resolve();
        })
    })
}

exports.updatePoint = (point) => {

    let { name, latitude, longitude, municipality, province, address, pointID } = point

    return new Promise((resolve, reject) => {
        const sql = "UPDATE POINT SET name = ?, latitude = ?, longitude = ?, address = ?, municipality=?, province=? WHERE pointID = ?";
        db.run(sql, [name, latitude, longitude, address, municipality, province, pointID], function (err, row) {
            if (err) {
                conseole.error(err)
                reject(err);
            }
            resolve();
        })
    })
}