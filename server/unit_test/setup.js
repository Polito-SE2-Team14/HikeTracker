const dbManager = require("../database/DBManagerSingleton").getTestInstance();

module.exports = async () => {
	await dbManager.clearDb();
};