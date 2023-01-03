const path = require('path');
const { writeFileSync, unlink, readFileSync, existsSync } = require("fs");

exports.getImage = function (id, type) {
	const file = checkPath(`./images/${type}s/_${id}_.img`);

	if (file)
		try {
			return readFileSync(file, {encoding: 'binary'});
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
exports.newImage = async (id, type, image) => {
	const file = checkPath(`./images/${type}s/_${id}_.img`);

	if (file)
		writeFileSync(file, image, {encoding: 'binary'});
	else throw Error('wrong path');
}

exports.deleteImage = (id, type) => {
	try {
		let file = checkPath(`./images/${type}s/_${id}_.img`);

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