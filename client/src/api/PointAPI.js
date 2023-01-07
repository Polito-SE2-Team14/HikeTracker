import REST from "./REST";

const pointApi = "/points";

const hutsApi = "/huts"

const getAllPoints = async () => {
	try {
		let response = await REST.GET(pointApi);
		let pointsJson = await response.json();

		return pointsJson.map((p) => {
			return {
				pointID: p.pointID,
				name: p.name,
				description: p.description,
				lat: p.latitude,
				province: p.province,
				municipality: p.municipality,
				lon: p.longitude,
				address: p.address,
				pointType: p.pointType,
			};
		});
	} catch (err) {
		console.error("Error in PointAPI.js", err);
		throw err;
	}
};

const getPoint = async (pointID) => {
	try {
		if (!pointID) {
			return undefined;
		}

		let response = await REST.GET(`${pointApi}/${pointID}`);
		console.log(response);
		let pointJson = await response.json();

		return {
			pointID: pointJson.pointID,
			name: pointJson.name,
			lat: pointJson.latitude,
			province: pointJson.province,
			municipality: pointJson.municipality,
			lon: pointJson.longitude,
			address: pointJson.address,
			pointType: pointJson.pointType,
		};
	} catch (err) {
		console.error("Error in PointAPI.js", err);
		throw err;
	}
};

/**
 * Returns all huts in the database
 * @returns {Hut[]} Array of all huts
 */
const getAllHuts = async () => {
	try {
		let response = await REST.GET(`${hutsApi}`);
		let hutsJson = await response.json();

		return hutsJson;
	} catch (err) {
		console.error("Error in PointAPI.js", err);
		throw err;
	}
};

const createHut = async (hut) => {
	try {
		console.log(hut);
		let response = await REST.UPDATE("POST", `${hutsApi}`, hut);
		let hutJson = await response.json();

		if (!response.status) throw Error();
		else return hutJson;
	} catch (err) {
		console.error("Error in PointAPI.js", err);
		throw err;
	}
};

const getImage = async (hutID) => {
	try {
		let response = await REST.GET(`${hutsApi}/${hutID}/image`);
		let image = await response.json();

		return image.image;
	} catch (err) {
		console.error(err);
		throw err;
	}
};

const addImage = async (hutID, image) => {
	let body = { image: image };

	try {
		await REST.UPDATE('POST', `${hutsApi}/${hutID}/image`, body, true);

		return true;
	} catch (err) {
		console.error(err);
		throw err;
	}
};

const deleteHut = async (hutID) => {
	try {
		let response = await REST.DELETE(hutsApi + "/" + hutID);
		if (!response.status) throw Error();
	} catch (err) {
		console.error("Error in PointAPI.js", err);
		throw err;
	}
};

const PointAPI = { getAllPoints, getPoint, getAllHuts, createHut, getImage, addImage, deleteHut };
export default PointAPI;
