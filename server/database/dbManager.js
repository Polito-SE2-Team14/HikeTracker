const sqlite = require('sqlite3');

// open the database
exports.db = new sqlite.Database('./database/myDB.db', (err) => {
  if (err) throw err;
});

exports.clearDb = async () => {
  let db = this.db
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