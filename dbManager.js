const sqlite = require('sqlite3');

// open the database
exports.db = new sqlite.Database('myDB.db', (err) => {
  if (err) throw err;
});