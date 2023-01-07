const Jimp = require('jimp');
const path = require('path');
const { writeFileSync, unlink, readFileSync, existsSync } = require("fs");

exports.getImage = function (id, type) {
	const file = checkPath(`./images/${type}s/_${id}_.img`);

	if (file)
		try {
			return readFileSync(file, { encoding: 'binary' });
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
		writeFileSync(file, image, { encoding: 'binary' });
	else throw Error('wrong path');
}

exports.deleteImage = (id, type) => {

	let file = checkPath(`./images/${type}s/_${id}_.img`);

	if (existsSync(file))
		unlink(file, err => {
			if (err) throw err;
		});
	else throw Error('wrong path');


}

function checkPath(relativePath) {
	let resolvedPath = path.resolve(__dirname + '/' + relativePath);
	let imagesDir = path.resolve(__dirname + '/images/');

	if (!resolvedPath.startsWith(imagesDir)) {
		throw Error('wrong path');
	}
	else return resolvedPath;
}


exports.readResizeCropSave = async (sourcePath, id, type) => {
	let src = path.resolve(__dirname + '/../' + sourcePath);
	try {
		const image = await Jimp.read(src)

		image._exif.imageSize.width < image._exif.imageSize.height ?
			image.resize(800, Jimp.AUTO) : image.resize(Jimp.AUTO, 600)
		image.crop(0, 0, 800, 600).getBase64(Jimp.AUTO, (err, res) => {
			if (!err)
				this.newImage(id, type, res)
		});
	} catch (error) {
		console.log(error.message)
	}

}