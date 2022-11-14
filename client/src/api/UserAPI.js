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

const UserAPI = { Register };
export default UserAPI;