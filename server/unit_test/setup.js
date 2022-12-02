const dbManager = require("../database/DBManagerSingleton").getInstance();

module.exports = async () => {
	await dbManager.clearDb();
};