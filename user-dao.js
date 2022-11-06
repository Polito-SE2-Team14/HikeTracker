'use strict';

const sqlite = require('sqlite3');
const crypto = require('crypto');

const db = new sqlite.Database('myDB.db', (err) => {
	if(err) throw err;
});

exports.getUserById=(id)=>{
	return new Promise((resolve,reject)=>{
		const sql='SELECT * FROM USER WHERE userID=?';
		db.get(sql,[id],(err,row)=>{
			if (err)
				reject(err);
			else if (row===undefined)
				resolve({error: 'User not found'});
			else{
				const student={id:row.id, name:row.name, surname:row.surname, full_time:row.full_time}
				resolve(student);
			}
		});
	});
};

	
exports.getUser = (email, password) => {
	return new Promise((resolve, reject) => {
		const sql = 'SELECT * FROM USER WHERE email = ?';
		db.get(sql, [email], (err, row) => {
			if (err) { reject(err); }
			else if (row === undefined) { resolve(false); }
			else {
				const user = {id: row.id, username: row.email, name: row.name, surname:row.surname, full_time:row.full_time};
		  
				const salt = row.salt;
				crypto.scrypt(password, salt, 16, (err, hashedPassword) => {
					if (err) reject(err);
					const passwordHex = Buffer.from(row.hash, 'hex');
					if(!crypto.timingSafeEqual(passwordHex, hashedPassword))
						resolve(false);
					else resolve(user);
				});
			}
		});
	});
};