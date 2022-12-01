const Singleton = require("../database/DBManagerSingleton");
const DBManager = require("../database/DBManager");
/** @type {DBManager} */
const dbManager = Singleton.getInstance();
const db = dbManager.getDB();

exports.getHuts = () => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT pointID, P.name, latitude, longitude, address
                    pointType, bedspace, municipality, province, country, U.name AS creatorName, surname, creatorID  
                    FROM POINT P, HUT H, USER U 
                    WHERE P.pointID = H.hutID 
                        AND pointType = 'hut' 
                        AND U.userID = P.creatorID`
        db.all(sql, (err, rows) => {
            if (err)
                reject(err);
            let huts = rows.map(r => {

                return {
                    pointID: r.pointID, name: r.name, latitude: r.latitude, longitude: r.longitude, address: r.address,
                    pointType: r.pointType, bedspace: r.bedspace, municipality: r.municipality, country: r.country,
                    province: r.province, creatorID: r.creatorID, creatorName: r.creatorName, creatorSurname: r.surname
                }
            }
            )
            resolve(huts);
        })
    })
}

exports.createHut = (hut) => {
    return new Promise((resolve, reject) => {

        const sql = "INSERT INTO HUT (hutID, bedspace) VALUES (?,?)";
        db.run(sql, [hut.pointID, hut.bedspace], function (err, row) {
            if (err)
                reject(err);
            resolve();
        })
    });
}


exports.updateHut = (hut) => {
    return new Promise((resolve, reject) => {
        const sql = "UPDATE HUT SET bedspace = ?, hutOwnerID = ? WHERE hutID = ?";
        db.run(sql, [hut.bedspace, hut.hutOwnerID, hut.pointID], function (err, row) {
            if (err)
                reject(err);
            resolve();
        })
    })
}

exports.deleteHut = (pointID) => {
    return new Promise((resolve, reject) => {
        const sql = "DELETE FROM HUT WHERE hutID = ?";
        db.run(sql, [pointID], function (err, row) {
            if (err)
                reject(err);
            resolve();
        })
    })
}