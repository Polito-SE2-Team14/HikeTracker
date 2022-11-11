import REST from './REST';
import User from '../class/User';

const api = '/users'

const Register = async (name, surname, email, pn, type, pwd) => {
	let body = {
		name: name,
		surname: surname,
		email: email,
		phoneNumber: pn,
		type: type,
		password: pwd
	};

	try {
		await REST.UPDATE('POST', api, body);

		return true;
	}
	catch (e) {
		throw e;
	}
};

const UserAPI = { Register };
export default UserAPI;