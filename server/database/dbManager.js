const sqlite = require('sqlite3');

// open the database
exports.db = new sqlite.Database('./database/myDB.sqlite', (err) => {
  if (err) {
    console.log("error db manager", err)
    throw err;
  }
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

exports.restoreOriginalHikes = async () => {
	let db=this.db;
	return new Promise(function (resolve,reject){
		db.run("DELETE FROM HIKE WHERE 1=1;")
		db.run("INSERT INTO HIKE (hikeID, title, lenght, expectedTime, ascent, difficulty, startPointID, endPointID, description) VALUES \
			(1, \"hike#1\", 7, 30, 100, \"Tourist\", 1, 4, \"firstDescription\"), \
			(2, \"hike#2\", 2, 45, 123, \"Hiker\", 2, 5, \"secondDescription\"), \
			(3, \"hike#3\", 3, 60, 514, \"Professional Hiker\", 3, 6, \"thirdDescription\");");
		resolve();
	})
}