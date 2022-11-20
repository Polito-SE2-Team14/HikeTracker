import REST from './REST';
//import User from '../class/User';

const api = '/users'

const Register = async (body) => {
	try {
		await REST.UPDATE('POST', api, body);

		return true;
	}
	catch (e) {
		return e;
	}
};

const getUserInfo = async () => {
	try {
		let response = await REST.GET(`${api}/current`,true);
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

const logIn = async (credentials) => {
	try {
		let response = await REST.UPDATE('POST', `${api}/login`, credentials, true);
		if (response.ok) {
			const user = await response.json();
			return user;
		}
	}
	catch (e) {
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
		return e;
	}
};


const UserAPI = { Register, getUserInfo, logIn, logOut };
export default UserAPI;