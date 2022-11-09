const sqlite = require('sqlite3');
const db =  new sqlite.Database('../database/myDB.db',(err)=>{
    if (err){
        throw err;
    }
});

class hikeDAO{
	
}

exports.getAllHikes=()=>{
	return new Promise((resolve,reject)=>{
		const sql='SELECT * FROM HIKE';
		db.all(sql,[],(err,rows)=>{
			if(err){
				reject(err);
				return;
			}
			const hikes=rows.map((h)=>({hikeID:h.hikeID,title:h.title,lenght:h.lenght,expectedTime:h.expectedTime,ascent:h.ascent,difficulty:h.difficulty,startPointID:h.startPointID,endPointID:h.endPointID,description:h.description}));
			resolve(hikes);
		});
	});
};

exports.check_hike=(wantedID)=>{
	db.run("SELECT * FROM HIKE WHERE ID=?",[wantedID],(err,row)=>{
		if(err){
			return false;
		}
		return true;
	});
};

exports.addHike=(newHike)=>{
	return new Promise((resolve,reject)=>{
		db.run("INSERT INTO HIKE (hikeID,title,lenght,expectedTime,ascent,difficulty,startPointID,endPointID,description) VALUES(?,?,?,?,?,?,?,?,?)",
		[newHike.hikeID,newHike.title,newHike.lenght,newHike.expectedTime,newHike.ascent,newHike.difficulty,newHike.startPointID,newHike.endPointID,newHike.description],
		(err)=>{
			if(err){
				reject(err);
				return;
			}else{
				resolve(newHike);
			}
		});
	});
};

exports.updateHike=(newHike)=>{
	return new Promise((resolve,reject)=>{
		db.run("UPDATE HIKES SET title=?, lenght=?, expectedTime=?, ascent=?, difficulty=?, startPointID=?, endPointID=?,description=? WHERE hikeID =?",
		[newHike.title,newHike.lenght,newHike.expectedTime,newHike.ascent,newHike.difficulty,newHike.startPointID,newHike.endPointID,newHike.description,newHike.hikeID],
		(err)=>{
			if(err){
				reject(err);
				return;
			}else{
				resolve(newHike);
			}
		});
	});
};

module.exports = hikeDAO;