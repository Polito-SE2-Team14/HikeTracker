const APIURL = 'http://localhost:3001/api';

/**
 * Generic GET request
 * @param {string} api - GET URL
 * @param {boolean} credentials - indicates the presence of credentials in the HTTP request
 * @returns HTTP response body
 */
const GET = async (api, credentials = false) => {
	let cred = credentials ? 'include' : null;
	let response = await fetch(`${APIURL}${api}`, {
		method: "GET",
		credentials: cred
	});

	if (response.ok)
		return response.json();
	else throw response;
};

/**
 * Generic POST/PUT request
 * @param {string} method - request method ('POST' or 'PUT')
 * @param {string} api - POST or PUT URL
 * @param {*} body - request body
 * @returns HTTP response
 */
const UPDATE = async (method, api, body) => {
	let response = await fetch(`${APIURL}${api}`, {
		method: method,
		headers: {
			'Content-Type': 'application/json'
		},
		credentials: 'include',
		body: JSON.stringify(body)
	});

	if (response.ok) return response.json();
	else throw response;
};

/**
 * Generic DELETE request
 * @param {string} api - DELETE URL
 * @returns HTTP response
 */
const DELETE = async (api) => {
	let response = await fetch(`${APIURL}${api}`, {
		method: 'DELETE',
		credentials: 'include'
	});

	if (response.ok) return true;
	else throw response;
};

const REST = { GET, UPDATE, DELETE };
export default REST;