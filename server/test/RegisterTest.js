'use strict'

const chai = require('chai');
const assert = chai.assert;
const crypto = require("crypto");
const UserAPICall = require('./APICalls/UserAPICalls')
const userAPICall = new UserAPICall()
const api = '/api/users';
const Singleton = require("../database/DBManagerSingleton")
const DBManager = require("../database/DBManager");
/** @type {DBManager} */
const dbManager = Singleton.getTestInstance();


const types = ['hiker', 'localGuide', 'hutWorker'];
let lastId = 0;
let users = [
	{
		id: ++lastId, name: 'mario', surname: 'rossi', email: 'mario.rossi@ex.com',
		phoneNumber: '0123456789', type: types[0], password: crypto.randomBytes(16).toString("hex")
	}
	//Other precomputed users
];
let newUsers = [
	{
		name: 'marco', surname: 'verdi', email: 'marco.verdi@ex.com',
		phoneNumber: '1111111111', type: types[0], password: crypto.randomBytes(16).toString("hex")
	},
	{
		name: 'matteo', surname: 'marroni', email: 'matteo.marroni@ex.com',
		phoneNumber: '2222222222', type: 'hut', password: crypto.randomBytes(16).toString("hex")
	}
	//Other test users
];

before('Registration test setup', async () =>
	await dbManager.clearDb()
		.then(async () => await dbManager.populateUser(users))
);

describe(`POST ${api}`, async () => {
	it('Register new user', async () => {
		let user = users[0];

		const response = await userAPICall.addNewUser(user)
		assert.equal(response.status, 201);
	});

	it('Register existing user', async () => {
		let user = users[0];

		const response = await userAPICall.addNewUser(user)
		assert.equal(response.status, 505);
	});

	it('Register user with wrong type', async () => {
		let user = newUsers[1];

		const response = await userAPICall.addNewUser(user)
		assert.equal(response.status, 422);
	});
});
