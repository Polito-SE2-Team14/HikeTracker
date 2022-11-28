import REST from "./REST";

const api = "/points";

const getAllPoints = async () => {
	try {
		let response = await REST.GET(api);
		let pointsJson = await response.json();

		return pointsJson.map(p => {
			return {
				pointID: p.pointID,
				name: p.name,
				lat: p.latitude,
				province: p.province,
				municipality: p.municipality,
				lon: p.longitude,
				address: p.address,
				pointType: p.pointType
			};
		});
	} catch (err) {
		console.error("Error in PointAPI.js", err)
		throw err;
	}
};

const getPoint = async (pointID) => {
	try {
		let response = await REST.GET(`${api}/${pointID}`);
		let pointJson = await response.json();

		return {
			pointID: pointJson.pointID,
			name: pointJson.name,
			lat: pointJson.latitude,
			province: pointJson.province,
			municipality: pointJson.municipality,
			lon: pointJson.longitude,
			address: pointJson.address,
			pointType: pointJson.pointType
		};
	} catch (err) {
		console.error("Error in PointAPI.js", err)
		throw err;
	}
};

/**
 * Returns all huts in the database
 * @returns {Hut[]} Array of all huts
 */
const getAllHuts = async () => {
	try {
		let response = await REST.GET(`${api}/huts`);
		let hutsJson = await response.json();

		return hutsJson;
	} catch (err) {
		console.error("Error in PointAPI.js", err)
		throw err;
	}
};

const createHut = async (hut) => {
	try {
		console.log(hut)
		let response = await REST.UPDATE("POST", `${api}/huts`, hut)
		if (!response.status)
			throw Error()
	}
	catch (err) {
		console.error("Error in PointAPI.js", err)
		throw err
	}
}

const deleteHut = async (hutID) => {
	try {
		let response = await REST.DELETE(api + "/huts/" + hutID)
		if (!response.status)
			throw Error()
	}
	catch (err) {
		console.error("Error in PointAPI.js", err)
		throw err
	}
}


const PointAPI = { getAllPoints, getPoint, getAllHuts, createHut, deleteHut };
export default PointAPI;
