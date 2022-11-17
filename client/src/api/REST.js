const APIURL = "http://localhost:3001/api";

/**
 * Generic GET request
 * @param {string} api - GET URL
 * @param {boolean} credentials - indicates the need for credentials in the HTTP request
 * @returns HTTP response body
 */
const GET = async (api, credentials = false) => {
	let req = {
		method: "GET",
	};

	if (credentials) {
		req.credentials = "include";
	}

	let response = await fetch(`${APIURL}${api}`, req);

	if (response.ok) return response;
	else throw response;
};

/**
 * Generic POST/PUT request
 * @param {string} method - request method ('POST' or 'PUT')
 * @param {string} api - POST or PUT URL
 * @param {*} body - request body
 * @returns HTTP response
 */
const UPDATE = async (method, api, body, credentials = false) => {
	let req = {
		method: method,
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	};

	if (credentials) {
		req.credentials = "include";
	}

	let response = await fetch(`${APIURL}${api}`, req);

	if (response.ok) return response;
	else throw response;
};

/**
 * Generic DELETE request
 * @param {string} api - DELETE URL
 * @returns HTTP response
 */
const DELETE = async (api, credentials = false) => {
	let req = {
		method: "DELETE",
		credentials: "include",
	};

	if (credentials) {
		req.credentials = "include";
	}

	let response = await fetch(`${APIURL}${api}`, req);

	if (response.ok) return response;
	else throw response;
};

const REST = { GET, UPDATE, DELETE };
export default REST;
