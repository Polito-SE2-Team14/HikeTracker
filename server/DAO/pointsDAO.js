const Singleton = require("../database/DBManagerSingleton")
const DBManager = require("../database/DBManager");
/** @type {DBManager} */
const dbManager = Singleton.getInstance();
const db = dbManager.getDB();

//const Point = require("../Class/Point");
//const Hut = require("../Class/Hut")

exports.getAllPoints = () => new Promise((resolve, reject) => {
    const sql = "SELECT * FROM POINT";
    
    db.all(sql, [], (err, rows) => {
        if (err) {
            reject(err);
            return;
        }
        //const point = new Point(row.pointID, row.name, row.latitude, row.longitude, row.address, row.pointType);
        const points = rows.map(row => {
            return {
                pointID: row.pointID, name: row.name, latitude: row.latitude, province: row.province,
                municipality: row.municipality, longitude: row.longitude, address: row.address, pointType: row.pointType
            }
        });
        resolve(points);
    })
});

exports.getPoint = (pointID) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM POINT WHERE pointID = ?";
        const params = [pointID];
        db.run(sql, params, (err, row) => {
            if (err) {
                reject(err);
                return;
            }
            //const point = new Point(row.pointID, row.name, row.latitude, row.longitude, row.address, row.pointType);
            const point = {
                pointID: row.pointID, name: row.name, latitude: row.latitude, province: row.province,
                municipality: row.municipality, longitude: row.longitude, address: row.address, pointType: row.pointType
            }
            resolve(point);
        })
    });
}

exports.getHikePoints = (hikeID) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM HIKEREFERENCEPOINT HR INNER JOIN POINT P ON HR.referencePointId = P.pointID WHERE HR.hikeId=?";
        const params = [hikeID];

        db.all(sql, params, (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            const points = rows.map((p) =>
            //new Point(p.pointID, p.name, p.latitude, p.longitude, p.address, p.pointType)
            {
                return {
                    pointID: p.pointID, name: p.name, latitude: p.latitude, longitude: p.longitude,
                    municipality: p.municipality, province: p.province, address: p.address, pointType: p.pointType
                }
            }
            );
            resolve(points);
        })
    });
}


exports.createPoint = (point) => {
    return new Promise((resolve, reject) => {


        const sql = "INSERT INTO POINT (name, latitude, longitude, municipality, province, address, pointType) VALUES (?,?,?,?,?,?,?)";
        db.run(sql, [point.name, point.latitude, point.longitude, point.municipality, point.province, point.address, point.type], function (err, row) {


            if (err) {
                reject(err);
            }
            resolve(this.lastID);
        })
    });
}

exports.deletePoint = (pointID) => {
    return new Promise((resolve, reject) => {
        const sql = "DELETE FROM POINT WHERE pointID = ?";
        db.run(sql, [pointID], function (err, row) {
            if (err) {
                reject(err);
            }
            resolve();
        })
    })
}

exports.getHuts = () => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM POINT P, HUT H WHERE P.pointID = H.hutID AND pointType = 'hut'"
        db.all(sql, (err, rows) => {
            if (err) {
                reject(err);
            }

            let huts = rows.map(r =>
            //new Hut(r.pointID, r.name, r.latitude, r.longitude, r.address, r.bedspace, r.hutOwnerID)
            {
                return {
                    pointID: r.pointID, name: r.name, latitude: r.latitude, longitude: r.longitude,
                    address: r.address, pointType: r.pointType, bedspace: r.bedspace, hutOwnerID: r.hutOwnerID,
                    municipality: r.municipality, province: r.province
                }
            }
            )
            resolve(huts);
        })
    })
}

exports.createHut = (hut) => {
    return new Promise((resolve, reject) => {

        const sql = "INSERT INTO HUT (hutID, bedspace, hutOwnerID) VALUES (?,?,?)";
        db.run(sql, [hut.pointID, hut.bedspace, hut.hutOwnerID], function (err, row) {
            if (err) {
                reject(err);
            }
            resolve();
        })
    });
}

exports.updatePoint = (point) => {
    return new Promise((resolve, reject) => {
        const sql = "UPDATE POINT SET name = ?, latitude = ?, longitude = ?, address = ?, municipality=?, province=? WHERE pointID = ?";
        db.run(sql, [point.name, point.latitude, point.longitude, point.address, point.municipality, point.province, point.pointID], function (err, row) {
            if (err) {
                reject(err);
            }
            resolve();
        })
    })
}

exports.updateHut = (hut) => {
    return new Promise((resolve, reject) => {
        const sql = "UPDATE HUT SET bedspace = ?, hutOwnerID = ? WHERE hutID = ?";
        db.run(sql, [hut.bedspace, hut.hutOwnerID, hut.pointID], function (err, row) {
            if (err) {
                reject(err);
            }
            resolve();
        })
    })
}

exports.deleteHut = (pointID) => {
    return new Promise((resolve, reject) => {
        const sql = "DELETE FROM HUT WHERE hutID = ?";
        db.run(sql, [pointID], function (err, row) {
            if (err) {
                reject(err);
            }
            resolve();
        })
    })
}