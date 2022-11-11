const db = require("../database/DBManagerSingleton").getTestInstance();

module.exports = async () => {
	await db.clearDb();
};