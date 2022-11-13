const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();

const app = require("../server.js");
const agent = chai.request.agent(app);
const api = '/api/users';

const dbManager = require("../database/DBManagerSingleton").getTestInstance();

const types = ['hiker', 'friend'];
let lastId = 0;
let users = [
	{ id: ++lastId, name: 'mario', surname: 'rossi', email: 'mario.rossi@ex.com', phoneNumber: '0123456789', type: types[0], password: 'pretest1' }
	//Other precomputed users
];
let newUsers = [
	{ name: 'marco', surname: 'verdi', email: 'marco.verdi@ex.com', phoneNumber: '1111111111', type: types[0], password: 'test1' },
	{ name: 'matteo', surname: 'marroni', email: 'matteo.marroni@ex.com', phoneNumber: '2222222222', type: 'hut', password: 'test2' }
	//Other test users
];

before('Registration test setup', async () =>
	await dbManager.clearDb()
		.then(async() => await dbManager.populateUser(users))
);

describe(`POST ${api}`, () => {
	testCorrectRegistration(newUsers);

	testWrongRegistration(users, newUsers[1]);
});

function testCorrectRegistration(users) {
	it('Register new user', done => {
		let user = users[0];

		agent.post(api)
			.send(user)
			.then(res => {
				res.should.have.status(201);
				done();
			});
	});
}

function testWrongRegistration(users, hut) {
	it('Register existing user', done => {
		let user = users[0];

		agent.post(api)
			.send(user)
			.then(res => {
				res.should.have.status(401);
				done();
			});
	});

	it('Register user with wrong type', done => {
		let user = hut;

		agent.post(api)
			.send(user)
			.then(res => {
				res.should.have.status(422);
				done();
			});
	});
}