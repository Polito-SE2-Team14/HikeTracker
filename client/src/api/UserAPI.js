import REST from './REST';

const api = '/users'

const Register = async (body) => {
	try {
		await REST.UPDATE('POST', api, body);

		return true;
	}
	catch (e) {
		console.error("Error in UserAPI.js",e)
		return e;
	}
};

const getUserInfo = async () => {
	try {
		let response = await REST.GET(`${api}/current`, true);
		if (response.ok) {
			const user = await response.json();
			return user;
		}
	}
	catch (error) {
		const errorJSON = await error.json();
		throw errorJSON;
	}
};

const verifyUser = async (token) => {
	try {
		let response = await REST.UPDATE('PUT', `${api}/verify/${token}`);
		if (response.ok) {
			return true;
		}
	}
	catch (error) {
		const errorJSON = await error.json();
		throw errorJSON;
	}
};

const sendVerificationEmail = async (token) => {
	try {
		let response = await REST.UPDATE('POST', `${api}/send-verification/${token}`);
		if (response.ok) {
			return true;
		}
	}
	catch (error) {
		const errorJSON = await error.json();
		throw errorJSON;
	}
};

const logIn = async (credentials) => {
	try {
		let response = await REST.UPDATE('POST', `${api}/login`, credentials, true);
		if (response.ok) {
			const user = await response.json();
			return user;
		}
	}
	catch (e) {
		console.error("Error in UserAPI.js",e)
		throw e;
	}
};

const logOut = async () => {
	try {
		let response = await REST.DELETE(`${api}/current`, true);
		if (response.ok) {
			return true;
		}
	}
	catch (e) {
		console.error("Error in UserAPI.js",e)
		return e;
	}
};


const UserAPI = { Register, getUserInfo, logIn, logOut, verifyUser, sendVerificationEmail };
export default UserAPI;