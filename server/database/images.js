const { writeFileSync, unlink, readFileSync, existsSync } = require("fs");

exports.getImage = function (id, type) {
	const file = checkPath(`./images/${type}/_${id}_.trk`);

	if (file)
		try {
			return JSON.parse(readFileSync(file, { encoding: 'utf8', flag: 'r' }));
		} catch (err) {
			throw Error(err)
		}
	return [];
}

/**
 * @param {*} id 
 * @param {string} type - 'hut' or 'hike'
 * @param {*} image 
 */
exports.newImage = (id, type, image) => {
	const file = checkPath(`./images/${type}/_${id}_.img`);

	if (file)
		writeFileSync(file, JSON.stringify(image), { flag: 'w', encoding: 'utf8' });
	else throw Error('wrong path');
}

exports.deleteImage = (id, type) => {
	try {
		let file = checkPath(`./images/${type}/_${id}_.img`);

		if (existsSync(file))
			unlink(file, err => {
				if (err) throw err;
			});
		else throw Error('wrong path');
	}
	catch (error) {
		throw error
	}
}

function checkPath(relativePath) {
	let resolvedPath = path.resolve(__dirname + '/' + relativePath);
	let imagesDir = path.resolve(__dirname + '/images/');

	if (!resolvedPath.startsWith(imagesDir)) {
		throw Error('wrong path');
	}
	else return resolvedPath;
}