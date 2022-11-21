const Singleton = require("../database/DBManagerSingleton")
const DBManager = require("../database/DBManager");
/** @type {DBManager} */
const dbManager = Singleton.getInstance();
const db = dbManager.getDB();

const Point = require("../Class/Point");
const Hut = require("../Class/Hut")

exports.getPoint = (pointID) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM POINT WHERE pointID = ?";
        const params = [pointID];
        db.run(sql, params, (err, row) => {
            if (err) {
                reject(err);
                return;
            }
            const point = new Point(row.pointID, row.name, row.latitude, row.longitude, row.address, row.pointType);
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
                console.log(err);
                reject(err);
                return;
            }
            const points = rows.map((p) => new Point(p.pointID, p.name, p.latitude, p.longitude, p.address, p.pointType));
            resolve(points);
        })
    });
}


exports.createPoint = (name, latitude, longitude, address) => {
    return new Promise((resolve, reject) => {

         if (typeof name != "string"
            || typeof latitude != "number"
            || typeof longitude != "number"
            || typeof address != "string")
            reject("Error type"); 
        


        const sql = "INSERT INTO POINT (name, latitude, longitude, address, pointType) VALUES (?,?,?,?,?)";
        db.run(sql, [name, latitude, longitude, address, "hut"], function (err, row) {


            if (err) {
                console.log(err)
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
                console.log(err)
                reject(err);
            }
            resolve();
        })
    })
}

exports.getHuts = () => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM POINT P, HUT H WHERE P.pointID = H.hutID"
        db.all(sql, (err, rows) => {
            if(err){
                console.log(err);
                reject(err);
            }

            let huts = rows.map(r => new Hut(r.hutID, r.name, r.latitude, r.longitude, r.address, r.bedspace, r.hutOwnerID))
            resolve(huts);
        })
    })
}

exports.createHut = (hutID, bedspace, hutOwnerID) => {
    return new Promise((resolve, reject) => {

        if (typeof hutID != "number"
            || typeof bedspace != "number"
            || typeof hutOwnerID != "number")
            reject("Error type"); 
        

        const sql = "INSERT INTO HUT (hutID, bedspace, hutOwnerID) VALUES (?,?,?)";
        db.run(sql, [hutID, bedspace, hutOwnerID], function (err, row) {
            if (err) {
                console.log(err)
                reject(err);
            }
            resolve();
        })
    });
}

exports.updatePoint = (point) => {
    return new Promise((resolve, reject) => {
        const sql = "UPDATE POINT SET name = ?, latitude = ?, longitude = ?, address = ? WHERE pointID = ?";
        db.run(sql, [point.name, point.latitude, point.longitude, point.address, point.pointID], function (err, row) {
            if (err) {
                console.log(err)
                reject(err);
            }
            resolve();
        })
    })
}

exports.updateHut = (hut) => {
    return new Promise((resolve, reject) => {
        console.log(hut)
        const sql = "UPDATE HUT SET bedspace = ?, hutOwnerID = ? WHERE hutID = ?";
        db.run(sql, [hut.bedspace, hut.hutOwnerID, hut.pointID], function (err, row) {
            if (err) {
                console.log("2",err)
                reject(err);
            }
            resolve();
        })
    })
}

exports.deleteHut = (hutID) => {
    return new Promise((resolve, reject) => {
        const sql = "DELETE FROM HUT WHERE hutID = ?";
        db.run(sql, [hutID], function (err, row) {
            if (err) {
                console.log(err)
                reject(err);
            }
            resolve();
        })
    })
}