const { start, clear } = require("../database/TestDB");

module.exports = async () => {
	await start();
	await clear();
};