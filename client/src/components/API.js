const APIURL = 'http://localhost:3001/api';

/**
 * Generic GET request
 * @param {string} api - GET URL
 * @param {boolean} credentials - indicates the presence of credentials in the HTTP request
 * @param {*} body - request body
 * @returns HTTP response body
 */
async function GET(api, credentials = false, body=null) {
	let reqBody = body ? JSON.stringify(body) : null;
	let cred = credentials ? 'include' : null;
	let response = await fetch(`${APIURL}${api}`, {
		method: "GET",
		credentials: cred,
		body: reqBody
	});
	let res = await response.json();

	if (response.ok)
		return res;
	else throw response;
}

/**
 * Generic POST/PUT request
 * @param {string} method - request method ('POST' or 'PUT')
 * @param {string} api - POST or PUT URL
 * @param {*} body - request body
 * @returns HTTP response
 */
async function UPDATE(method, api, body) {
	let response = await fetch(`${APIURL}${api}`, {
		method: method,
		headers: {
			'Content-Type': 'application/json'
		},
		credentials: 'include',
		body: JSON.stringify(body)
	});

	if (response.ok) return response;
	else throw response;
}

/**
 * @returns Full list of hikes
 */
const getHikes = () =>
	GET("/hikes");


/**
 * @param {number} hikeID
 * @returns Selected hike
 */
const getHike = (hikeID) => 
	GET(`/hikes/${hikeID}`);

/**
 * 
 * @param {string} title 
 * @param {number} length 
 * @param {number} eta 
 * @param {number} ascent 
 * @param {string} difficulty 
 * @param {string} description 
 * @returns request result
 */
const newHike = (title, length, eta, ascent, difficulty, description) =>
	UPDATE("POST", "/hikes", {
		title: title,
		length: length,
		expectedTime: eta,
		ascent: ascent,
		difficulty: difficulty,
		description: description
	});

const updateHike = (hikeID, pointType, pointID) => {
	let body = { hikeID: hikeID };

	switch (pointType) {
		case "start":
			body.startPointID = pointID;
			break;
		case "end":
			body.endPointID = pointID;
			break;
		case "hut":
			body.hutID = pointID;
			break;
		default:
			throw "Unexpected point type";
	}

	return UPDATE("PUT", `/${pointType}`, body);
}

const getPoint = (pointID) => 
GET(`/points/${pointID}`);

const getHikePoints = (hikeID) => 
	GET('/hike-points', false, {hideID: hikeID});

const API = { getHikes, getHike, newHike, updateHike, getPoint, getHikePoints };
export default API;