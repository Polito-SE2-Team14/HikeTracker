const sqlite = require('sqlite3');

// open the database
exports.db = new sqlite.Database('./database/myDB.db', (err) => {
  if (err) throw err;
});