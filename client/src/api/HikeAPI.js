import gpxParser from "gpxparser";
import REST from "./REST";
const api = "/hikes";

/**
 * Returns all hikes in the database
 * @returns {Hike[]} Array of all hikes
 */
//TODO(antonio): remember to pass also start and end point
const getAllHikes = async () => {
	try {
		let response = await REST.GET(api);
		let hikesJson = await response.json();

		return hikesJson.map(
			(h) => {
				return {
					hikeID: h.hikeID,
					title: h.title,
					length: h.length,
					expectedTime: h.expectedTime,
					ascent: h.ascent,
					difficulty: h.difficulty,
					description: h.description,
					country: h.country,
					province: h.province,
					municipality: h.municipality,
					startPointID: h.startPointID,
					endPointID: h.endPointID,
					creatorID: h.creatorID,
					creatorName: h.creatorName,
					creatorSurname: h.creatorSurname,
					track: h.track,
				};
			}
		);
	} catch (e) {
		console.error("Error in HikeAPI.js", e)
		throw e;
	}
};

const getHike = async (hikeID) => {
	try {
		let response = await REST.GET(`${api}/${hikeID}`);
		let hikeJson = await response.json();

		return {
			hikeID: hikeJson.hikeID,
			title: hikeJson.title,
			length: hikeJson.length,
			expectedTime: hikeJson.expectedTime,
			ascent: hikeJson.ascent,
			difficulty: hikeJson.difficulty,
			description: hikeJson.description,
			municipality: hikeJson.municipality,
			province: hikeJson.province,
			startPointID: hikeJson.startPointID,
			endPointID: hikeJson.endPointID,
			country: hikeJson.country,
			creatorID: hikeJson.creatorID,
			creatorName: hikeJson.creatorName,
			creatorSurname: hikeJson.creatorSurname,
		};
	}
	catch (e) {
		console.error(e)
		throw e;
	}
};


/**
 * Insert a new hike in the database
 * @param {String} title Title of the new hike
 * @param {float} length Distance(in meters) of the new hike
 * @param {float} eta Expected time(in minutes) of the new hike
 * @param {float} ascent Positive elevation difference of the new hike
 * @param {String} difficulty Difficulty ("Tourist", "Hiker" or "Professional Hiker") of the new hike
 * @param {String} description Description of the new hike
 * @returns {boolean} Success of the operation
 */
const newHike = async (hike) => {
	let gpx = new gpxParser();
	gpx.parse(hike.track);

	let length = Math.round(gpx.tracks[0].distance.total);
	let ascent = gpx.tracks[0].elevation.pos ? Math.round(gpx.tracks[0].elevation.pos.toFixed(0)) : 0;
	let eta = Math.round((12.09 * length + 98.4 * ascent) / 1000);
	let points = gpx.tracks[0].points.map(p => [p.lat, p.lon]);

	let body = {
		title: hike.title,
		length: length,
		expectedTime: eta,
		ascent: ascent,
		difficulty: hike.difficulty,
		description: hike.description,
		municipality: hike.municipality,
		province: hike.province,
		track: points,
		country: hike.country,
		creatorID: hike.creatorID
	};


	try {
		let response = await REST.UPDATE("POST", api, body, true);
		let hikeJson = await response.json();

		return hikeJson;
	} catch (e) {
		console.error("Error in HikeAPI.js", e)
		throw e;
	}
};

/**
 * Modify details of an hike in the database
 * @param {String} hikeID Id of the selected hike
 * @param {String} title Title of the hike
 * @param {float} length Distance(in meters) of the hike
 * @param {float} eta Expected time(in minutes) of the hike
 * @param {float} ascent Positive elevation difference of the hike
 * @param {String} difficulty Difficulty ("Tourist", "Hiker" or "Professional Hiker") of the hike
 * @param {String} description Description of the hike
 * @returns {boolean} Success of the operation
 */
const editHike = async (hike) => {
	// TODO(antonio): client-side validation

	let { hikeID, title, length, eta, ascent,
		difficulty, description, municipality, province } = hike

	let body = {
		hikeID: parseInt(hikeID),
		title: title,
		length: parseInt(length),
		expectedTime: parseInt(eta),
		ascent: parseInt(ascent),
		difficulty: difficulty,
		description: description,
		municipality: municipality,
		province: province
	};

	try {
		await REST.UPDATE("PUT", api, body, true);

		return true;
	} catch (e) {
		console.error("Error in HikeAPI.js", e)
		throw e;
	}
};

/**
 * Delete an hike in the database
 * @param {String} hikeID Id of the hike to delete
 * @returns {boolean} Success of the operation
 */
const deleteHike = async (hikeID) => {
	try {
		await REST.DELETE(`${api}/${hikeID}`);

		return true;
	} catch (err) {
		console.error(err);
		throw err;
	}
};

const addStartPoint = async (hikeID, pointID) => {
	let body = {
		hikeID: hikeID,
		startPointID: pointID,
	};


	try {
		await REST.UPDATE("POST", `${api}/start`, body, true);

		return true;
	} catch (e) {
		console.error("Error in HikeAPI.js", e)
		throw e;
	}
};

const addEndPoint = async (hikeID, pointID) => {
	let body = {
		hikeID: hikeID,
		endPointID: pointID,
	};



	try {
		await REST.UPDATE("POST", `${api}/end`, body, true);

		return true;
	} catch (e) {
		console.error("Error in HikeAPI.js", e)
		throw e;
	}
};

const addReferencePoint = async (point, hikeID) => {
	const body =  {
		hikeID: hikeID,
		referencePoint: {
			name: point.name,
			description: point.description,
			latitude: point.latitude,
			longitude: point.longitude,
			altitude: 0,
			country: point.country,
			province: point.province,
			municipality: point.municipality,
			creatorID: point.creatorID
		}
	}

	try {
		await REST.UPDATE('POST', `${api}/referencePoints`, body, true);

		return true;
	} catch(e) {
		console.error("Error in HikeAPI.js", e);
		throw e;
	}
}

const addHut = async (hikeID, hutID) => {
	try {
		await REST.UPDATE("POST", `${api}/${hikeID}/huts/${hutID}`, null, true);

		return true;
	} catch (e) {
		console.error("Error in HikeAPI.js", e)
		throw e;
	}
};

const addHuts = async (hikeID, hutIDs) => {
	try {
		hutIDs.forEach(hutID => addHut(hikeID, hutID));

		return true;
	} catch (e) {
		console.error("Error in HikeAPI.js", e)
		throw e;
	}
};

const getCloseHuts = async hikeID => {
	try {
		let response = await REST.GET(`${api}/${hikeID}/huts`);
		let hutsJson = await response.json();

		return hutsJson;
	} catch (e) {
		console.error("Error in HikeAPI.js", e)
		throw e;
	}
};

const getLinkedHuts = async hikeID => {
	try {
		let response = await REST.GET(`${api}/${hikeID}/linkedHuts`);
		let hutsJson = await response.json();

		return hutsJson;
	} catch (e) {
		console.error("Error in HikeAPI.js", e)
		throw e;
	}
};

const getHikeTrack = async (hikeID) => {
	try {
		let response = await REST.GET(`${api}/${hikeID}/track`);
		let trackJson = await response.json();
		// trackJson = {[[x1,y1], [x2,y2], ...]}

		return trackJson
	}
	catch (e) {
		console.error("Error in HikeAPI.js", e)
		throw e;
	}
}

const getHikePoints = async (hikeID) => {
	try {
		let response = await REST.GET(`${api}/${hikeID}/referencePoints`);
		let pointsJson = await response.json();

		return pointsJson.map(
			(p) => {
				return {
					pointID: p.pointID,
					name: p.name,
					latitude: p.latitude,
					longitude: p.longitude,
					address: p.address,
					pointType: p.pointType,
					description: p.description,
				}
			}
		);
	} catch (e) {
		console.error("Error in HikeAPI.js", e)
		throw e;
	}
};

const HikeAPI = {
	getAllHikes,
	getHike,
	newHike,
	editHike,
	deleteHike,
	getHikeTrack,
	addReferencePoint,
	addStartPoint,
	addEndPoint,
	addHut,
	addHuts,
	getCloseHuts,
	getLinkedHuts,
	getHikePoints
};
export default HikeAPI;
