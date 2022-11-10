const { unlink } = require("node:fs");

module.exports = async () => {
	await new Promise((resolve, reject) =>
		unlink('../database/test.sqlite', err => {
			if (err) reject(err);
			else resolve();
		})
	);
}