const { start } = require("../database/TestDB");

module.exports = async () => {
	await start();
};