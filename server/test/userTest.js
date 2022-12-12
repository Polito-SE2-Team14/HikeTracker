'use strict'

const crypto = require("node:crypto");
const chai = require('chai');
const assert = chai.assert;

const UserAPICall = require('./APICalls/UserAPICalls');
const userAPICall = new UserAPICall();

const Singleton = require("../database/DBManagerSingleton");
const DBManager = require("../database/DBManager");
/** @type {DBManager} */
const dbManager = Singleton.getInstance();

const SingletonTest = require("./SingletonTest")
SingletonTest.getInstance()

before('starting user tests', async () => await dbManager.clearDb());

afterEach('clearing DB', async () => await dbManager.clearDb());

describe('User test suite', () => {
	describe('Register new user', async () => {
		// it('POST /users', async () => {
		// 	const user = {
		// 		name: 'Mario',
		// 		surname: 'Rossi',
		// 		email: 'mario.rossi@ex.com',
		// 		phoneNumber: '0123456789',
		// 		type: 'hiker',
		// 		password: crypto.randomBytes(16).toString("hex")
		// 	};

		// 	let response = await userAPICall.addNewUser(user);

		// 	assert.equal(response.status, 201, response.status);

		// 	user.type = 'localGuide';

		// 	response = await userAPICall.addNewUser(user);

		// 	assert.equal(response.status, 201, response.status);

		// 	user.type = 'hutWorker';

		// 	response = await userAPICall.addNewUser(user);

		// 	assert.equal(response.status, 201, response.status);
		// });

		it('POST /users existing', async () => {
			await dbManager.addUsers();

			const user = {
				name: 'Mario',
				surname: 'Rossi',
				email: 'mario.rossi@ex.com',
				phoneNumber: '1234567890',
				type: 'hiker',
				password: crypto.randomBytes(16).toString("hex")
			};

			let response = await userAPICall.addNewUser(user);

			assert.equal(response.status, 505, response.status);

			user.phoneNumber = '0123456789';
			user.email = 'ex@email.com';

			response = await userAPICall.addNewUser(user);

			assert.equal(response.status, 422, response.status);
		});

		it('POST /users missing body', async () => {
			let response = await userAPICall.addNewUser(null);

			assert.equal(response.status, 400, response.status);

			response = await userAPICall.addNewUser(undefined);

			assert.equal(response.status, 422, response.status);
		});

		it('POST /users wrong name', async () => {
			const user = {
				name: null,
				surname: 'Rossi',
				email: 'mario.rossi@ex.com',
				phoneNumber: '1234567890',
				type: 'hiker',
				password: crypto.randomBytes(16).toString("hex")
			};

			let response = await userAPICall.addNewUser(user);

			assert.equal(response.status, 422, response.status);
		});

		it('POST /users wrong surname', async () => {
			const user = {
				name: 'Mario',
				surname: null,
				email: 'mario.rossi@ex.com',
				phoneNumber: '1234567890',
				type: 'hiker',
				password: crypto.randomBytes(16).toString("hex")
			};

			let response = await userAPICall.addNewUser(user);

			assert.equal(response.status, 422, response.status);
		});

		it('POST /users wrong email', async () => {
			const user = {
				name: 'Mario',
				surname: 'Rossi',
				email: null,
				phoneNumber: '1234567890',
				type: 'hiker',
				password: crypto.randomBytes(16).toString("hex")
			};

			let response = await userAPICall.addNewUser(user);

			assert.equal(response.status, 422, response.status);
		});

		it('POST /users wrong phoneNumber', async () => {
			const user = {
				name: 'Mario',
				surname: 'Rossi',
				email: 'mario.rossi@ex.com',
				phoneNumber: null,
				type: 'hiker',
				password: crypto.randomBytes(16).toString("hex")
			};

			let response = await userAPICall.addNewUser(user);

			assert.equal(response.status, 422, response.status);
		});

		it('POST /users wrong type', async () => {
			const user = {
				name: 'Mario',
				surname: 'Rossi',
				email: 'mario.rossi@ex.com',
				phoneNumber: '1234567890',
				type: null,
				password: crypto.randomBytes(16).toString("hex")
			};

			let response = await userAPICall.addNewUser(user);

			assert.equal(response.status, 422, response.status);
		});

		it('POST /users wrong password', async () => {
			const user = {
				name: 'Mario',
				surname: 'Rossi',
				email: 'mario.rossi@ex.com',
				phoneNumber: '1234567890',
				type: 'hiker',
				password: null
			};

			let response = await userAPICall.addNewUser(user);

			assert.equal(response.status, 422, response.status);
		});

		it('POST /users missing name', async () => {
			const user = {
				surname: 'Rossi',
				email: 'mario.rossi@ex.com',
				phoneNumber: '1234567890',
				type: 'hiker',
				password: crypto.randomBytes(16).toString("hex")
			};

			let response = await userAPICall.addNewUser(user);

			assert.equal(response.status, 422, response.status);
		});

		it('POST /users missing surname', async () => {
			const user = {
				name: 'Mario',
				email: 'mario.rossi@ex.com',
				phoneNumber: '1234567890',
				type: 'hiker',
				password: crypto.randomBytes(16).toString("hex")
			};

			let response = await userAPICall.addNewUser(user);

			assert.equal(response.status, 422, response.status);
		});

		it('POST /users missing email', async () => {
			const user = {
				name: 'Mario',
				surname: 'Rossi',
				phoneNumber: '1234567890',
				type: 'hiker',
				password: crypto.randomBytes(16).toString("hex")
			};

			let response = await userAPICall.addNewUser(user);

			assert.equal(response.status, 422, response.status);
		});

		it('POST /users missing phoneNumber', async () => {
			const user = {
				name: 'Mario',
				surname: 'Rossi',
				email: 'mario.rossi@ex.com',
				type: 'hiker',
				password: crypto.randomBytes(16).toString("hex")
			};

			let response = await userAPICall.addNewUser(user);

			assert.equal(response.status, 422, response.status);
		});

		it('POST /users missing type', async () => {
			const user = {
				name: 'Mario',
				surname: 'Rossi',
				email: 'mario.rossi@ex.com',
				phoneNumber: '1234567890',
				password: crypto.randomBytes(16).toString("hex")
			};

			let response = await userAPICall.addNewUser(user);

			assert.equal(response.status, 422, response.status);
		});

		it('POST /users missing password', async () => {
			const user = {
				name: 'Mario',
				surname: 'Rossi',
				email: 'mario.rossi@ex.com',
				phoneNumber: '1234567890',
				type: 'hiker'
			};

			let response = await userAPICall.addNewUser(user);

			assert.equal(response.status, 422, response.status);
		});
	});
});