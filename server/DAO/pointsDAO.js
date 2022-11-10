const sqlite = require('sqlite3');
const { db } = require("../database/dbManager");

const Point = require("../Class/Point");

exports.getPoint = (pointID) => {
    const sql = "SELECT * FROM POINT WHERE pointID = ?";
    const params = [pointID];
    db.run(sql, params, (err, row) => {
        if(err){
            reject(err);
            return;
        }

        const point = new Point(row.pointID, row.name, row.latitude, row.longitude, row.address, row.pointType);
        resolve(point);
    })
}

exports.getHikePoints = (hikeID) => {
    const sql = "SELECT * FROM HIKEREFERENCEPOINT HR, POINTS P WHERE HR.hikeId=? AND P.referencePointId = HR.referencePointId";
    const params = [hikeID];

    db.all(sql, params, (err, rows) => {
        if(err){
            reject(err);
            return;
        }
        const points = rows.map((p) => new Point(p.pointID, p.name, p.latitude, p.longitude, p.address, p.pointType));
        resolve(points);
    })
}

exports.get