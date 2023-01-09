'use strict';

const chai = require('chai');
const assert = chai.assert;

const HutAPICall = require('./APICalls/hutAPICalls');
const hutAPICall = new HutAPICall();


const Singleton = require("../database/DBManagerSingleton")
const DBManager = require("../database/DBManager");
/** @type {DBManager} */
const dbManager = Singleton.getInstance();

const SingletonTest = require("./SingletonTest")
SingletonTest.getInstance();

describe('Hut test suite', async () => {
	beforeEach('adding users', async () => await dbManager.addUsers());
	
	describe('Getting huts', () => {
		it('GET /huts empty', async () => {
			let response = await hutAPICall.getHutsCall();
			let data = await response.data;

	        assert.equal(response.status, 200, response.status);
			assert.deepEqual(data, []);
		});

		it('GET /huts not empty', async () => {
			const expectedData = await dbManager.addHuts();

			let response = await hutAPICall.getHutsCall();
			let data = await response.data;

			assert.equal(response.status, 200, response.status);
			assert.deepEqual(data, expectedData);
		});
	});

	describe("Creating a new hut", async () => {
	    it('POST /huts', async () => {
			const hut = {
				name: 'hut',
				description: 'hut',
				altitude: 100,
				latitude: 45.95233, 
				longitude: 8.4457,
				address: 'address',
				municipality: 'Collegno',
				province: 'Turin',
				country: 'Italy',
				bedspace: 50,
				phoneNumber: '123456789',
				website: 'www.website.com',
				email: 'hut@mail.com',
				creatorID: 6
			};

			
	        let response = await hutAPICall.addHutCall(hut);

	        assert.equal(response.status, 201, response.status);
		});

		it("POST /huts missing body", async () => {
			let response = await hutAPICall.addHutCall(null);

			assert.equal(response.status, 400, response.status);

			response = await hutAPICall.addHutCall(undefined);

			assert.equal(response.status, 422, response.status);
		});

	    it("POST /huts wrong name", async () => {
			const hut = {
				name: null,
				description: 'hut',
				altitude: 100,
				latitude: 45.95233,
				longitude: 8.4457,
				address: 'address',
				municipality: 'Collegno',
				province: 'Turin',
				country: 'Italy',
				bedspace: 50,
				phoneNumber: '123456789',
				website: 'www.website.com',
				email: 'hut@mail.com',
				creatorID: 6
			};

			const response = await hutAPICall.addHutCall(hut);

			assert.equal(response.status, 422, response.status);
	    });

	    it("POST /huts wrong description", async () => {
			const hut = {
				name: 'hut',
				description: null,
				altitude: 100,
				latitude: 45.95233,
				longitude: 8.4457,
				address: 'address',
				municipality: 'Collegno',
				province: 'Turin',
				country: 'Italy',
				bedspace: 50,
				phoneNumber: '123456789',
				website: 'www.website.com',
				email: 'hut@mail.com',
				creatorID: 6
			};

			const response = await hutAPICall.addHutCall(hut);

			assert.equal(response.status, 422, response.status);
	    });

	    it("POST /huts wrong altitude", async () => {
			const hut = {
				name: 'hut',
				description: 'hut',
				altitude: 'invalid',
				latitude: 45.95233,
				longitude: 8.4457,
				address: 'address',
				municipality: 'Collegno',
				province: 'Turin',
				country: 'Italy',
				bedspace: 50,
				phoneNumber: '123456789',
				website: 'www.website.com',
				email: 'hut@mail.com',
				creatorID: 6
			};

			const response = await hutAPICall.addHutCall(hut);

			assert.equal(response.status, 422, response.status);
	    });

	    it("POST /huts wrong latitude", async () => {
			const hut = {
				name: 'hut',
				description: 'hut',
				altitude: 100,
				latitude: 'invalid',
				longitude: 8.4457,
				address: 'address',
				municipality: 'Collegno',
				province: 'Turin',
				country: 'Italy',
				bedspace: 50,
				phoneNumber: '123456789',
				website: 'www.website.com',
				email: 'hut@mail.com',
				creatorID: 6
			};

			const response = await hutAPICall.addHutCall(hut);

			assert.equal(response.status, 422, response.status);
	    });

	    it("POST /huts wrong longitude", async () => {
			const hut = {
				name: 'hut',
				description: 'hut',
				altitude: 100,
				latitude: 45.95233,
				longitude: 'invalid',
				address: 'address',
				municipality: 'Collegno',
				province: 'Turin',
				country: 'Italy',
				bedspace: 50,
				phoneNumber: '123456789',
				website: 'www.website.com',
				email: 'hut@mail.com',
				creatorID: 6
			};

			const response = await hutAPICall.addHutCall(hut);

			assert.equal(response.status, 422, response.status);
	    });

	    it("POST /huts wrong address", async () => {
			const hut = {
				name: 'hut',
				description: 'hut',
				altitude: 100,
				latitude: 45.95233,
				longitude: 8.4457,
				address: null,
				municipality: 'Collegno',
				province: 'Turin',
				country: 'Italy',
				bedspace: 50,
				phoneNumber: '123456789',
				website: 'www.website.com',
				email: 'hut@mail.com',
				creatorID: 6
			};

			const response = await hutAPICall.addHutCall(hut);

			assert.equal(response.status, 422, response.status);
	    });

	    it("POST /huts wrong municipality", async () => {
			const hut = {
				name: 'hut',
				description: 'hut',
				altitude: 100,
				latitude: 45.95233,
				longitude: 8.4457,
				address: 'address',
				municipality: null,
				province: 'Turin',
				country: 'Italy',
				bedspace: 50,
				phoneNumber: '123456789',
				website: 'www.website.com',
				email: 'hut@mail.com',
				creatorID: 6
			};

			const response = await hutAPICall.addHutCall(hut);

			assert.equal(response.status, 422, response.status);
	    });

	    it("POST /huts wrong province", async () => {
			const hut = {
				name: 'hut',
				description: 'hut',
				altitude: 100,
				latitude: 45.95233,
				longitude: 8.4457,
				address: 'address',
				municipality: 'Collegno',
				province: null,
				country: 'Italy',
				bedspace: 50,
				phoneNumber: '123456789',
				website: 'www.website.com',
				email: 'hut@mail.com',
				creatorID: 6
			};

			const response = await hutAPICall.addHutCall(hut);

			assert.equal(response.status, 422, response.status);
	    });

	    it("POST /huts wrong country", async () => {
			const hut = {
				name: 'hut',
				description: 'hut',
				altitude: 100,
				latitude: 45.95233,
				longitude: 8.4457,
				address: 'address',
				municipality: 'Collegno',
				province: 'Turin',
				country: null,
				bedspace: 50,
				phoneNumber: '123456789',
				website: 'www.website.com',
				email: 'hut@mail.com',
				creatorID: 6
			};

			const response = await hutAPICall.addHutCall(hut);

			assert.equal(response.status, 422, response.status);
	    });

	    it("POST /huts wrong bedspace", async () => {
			const hut = {
				name: 'hut',
				description: 'hut',
				altitude: 100,
				latitude: 45.95233,
				longitude: 8.4457,
				address: 'address',
				municipality: 'Collegno',
				province: 'Turin',
				country: 'Italy',
				bedspace: 'invalid',
				phoneNumber: '123456789',
				website: 'www.website.com',
				email: 'hut@mail.com',
				creatorID: 6
			};

			const response = await hutAPICall.addHutCall(hut);

			assert.equal(response.status, 422, response.status);
	    });

	    it("POST /huts wrong phoneNumber", async () => {
			const hut = {
				name: 'hut',
				description: 'hut',
				altitude: 100,
				latitude: 45.95233,
				longitude: 8.4457,
				address: 'address',
				municipality: 'Collegno',
				province: 'Turin',
				country: 'Italy',
				bedspace: 50,
				phoneNumber: null,
				website: 'www.website.com',
				email: 'hut@mail.com',
				creatorID: 6
			};

			const response = await hutAPICall.addHutCall(hut);

			assert.equal(response.status, 422, response.status);
	    });

	    it("POST /huts wrong creatorID", async () => {
			const hut = {
				name: 'hut',
				description: 'hut',
				altitude: 100,
				latitude: 45.95233,
				longitude: 8.4457,
				address: 'address',
				municipality: 'Collegno',
				province: 'Turin',
				country: 'Italy',
				bedspace: 50,
				phoneNumber: '123456789',
				website: 'www.website.com',
				email: 'hut@mail.com',
				creatorID: 'invalid'
			};

			const response = await hutAPICall.addHutCall(hut);

			assert.equal(response.status, 422, response.status);
	    });

	    it("POST /huts missing name", async () => {
			const hut = {
				description: 'hut',
				altitude: 100,
				latitude: 45.95233,
				longitude: 8.4457,
				address: 'address',
				municipality: 'Collegno',
				province: 'Turin',
				country: 'Italy',
				bedspace: 50,
				phoneNumber: '123456789',
				website: 'www.website.com',
				email: 'hut@mail.com',
				creatorID: 6
			};

			const response = await hutAPICall.addHutCall(hut);

			assert.equal(response.status, 422, response.status);
	    });

	    it("POST /huts missing description", async () => {
			const hut = {
				name: 'hut',
				altitude: 100,
				latitude: 45.95233,
				longitude: 8.4457,
				address: 'address',
				municipality: 'Collegno',
				province: 'Turin',
				country: 'Italy',
				bedspace: 50,
				phoneNumber: '123456789',
				website: 'www.website.com',
				email: 'hut@mail.com',
				creatorID: 6
			};

			const response = await hutAPICall.addHutCall(hut);

			assert.equal(response.status, 422, response.status);
	    });

	    it("POST /huts missing altitude", async () => {
			const hut = {
				name: 'hut',
				description: 'hut',
				latitude: 45.95233,
				longitude: 8.4457,
				address: 'address',
				municipality: 'Collegno',
				province: 'Turin',
				country: 'Italy',
				bedspace: 50,
				phoneNumber: '123456789',
				website: 'www.website.com',
				email: 'hut@mail.com',
				creatorID: 6
			};

			const response = await hutAPICall.addHutCall(hut);

			assert.equal(response.status, 422, response.status);
	    });

	    it("POST /huts missing latitude", async () => {
			const hut = {
				name: 'hut',
				description: 'hut',
				altitude: 100,
				longitude: 8.4457,
				address: 'address',
				municipality: 'Collegno',
				province: 'Turin',
				country: 'Italy',
				bedspace: 50,
				phoneNumber: '123456789',
				website: 'www.website.com',
				email: 'hut@mail.com',
				creatorID: 6
			};

			const response = await hutAPICall.addHutCall(hut);

			assert.equal(response.status, 422, response.status);
	    });

	    it("POST /huts missing longitude", async () => {
			const hut = {
				name: 'hut',
				description: 'hut',
				altitude: 100,
				latitude: 45.95233,
				address: 'address',
				municipality: 'Collegno',
				province: 'Turin',
				country: 'Italy',
				bedspace: 50,
				phoneNumber: '123456789',
				website: 'www.website.com',
				email: 'hut@mail.com',
				creatorID: 6
			};

			const response = await hutAPICall.addHutCall(hut);

			assert.equal(response.status, 422, response.status);
	    });

	    it("POST /huts missing address", async () => {
			const hut = {
				name: 'hut',
				description: 'hut',
				altitude: 100,
				latitude: 45.95233,
				longitude: 8.4457,
				municipality: 'Collegno',
				province: 'Turin',
				country: 'Italy',
				bedspace: 50,
				phoneNumber: '123456789',
				website: 'www.website.com',
				email: 'hut@mail.com',
				creatorID: 6
			};

			const response = await hutAPICall.addHutCall(hut);

			assert.equal(response.status, 422, response.status);
	    });

	    it("POST /huts missing municipality", async () => {
			const hut = {
				name: 'hut',
				description: 'hut',
				altitude: 100,
				latitude: 45.95233,
				longitude: 8.4457,
				address: 'address',
				province: 'Turin',
				country: 'Italy',
				bedspace: 50,
				phoneNumber: '123456789',
				website: 'www.website.com',
				email: 'hut@mail.com',
				creatorID: 6
			};

			const response = await hutAPICall.addHutCall(hut);

			assert.equal(response.status, 422, response.status);
	    });

	    it("POST /huts missing province", async () => {
			const hut = {
				name: 'hut',
				description: 'hut',
				altitude: 100,
				latitude: 45.95233,
				longitude: 8.4457,
				address: 'address',
				municipality: 'Collegno',
				country: 'Italy',
				bedspace: 50,
				phoneNumber: '123456789',
				website: 'www.website.com',
				email: 'hut@mail.com',
				creatorID: 6
			};

			const response = await hutAPICall.addHutCall(hut);

			assert.equal(response.status, 422, response.status);
	    });

	    it("POST /huts missing country", async () => {
			const hut = {
				name: 'hut',
				description: 'hut',
				altitude: 100,
				latitude: 45.95233,
				longitude: 8.4457,
				address: 'address',
				municipality: 'Collegno',
				province: 'Turin',
				bedspace: 50,
				phoneNumber: '123456789',
				website: 'www.website.com',
				email: 'hut@mail.com',
				creatorID: 6
			};

			const response = await hutAPICall.addHutCall(hut);

			assert.equal(response.status, 422, response.status);
	    });

	    it("POST /huts missing bedspace", async () => {
			const hut = {
				name: 'hut',
				description: 'hut',
				altitude: 100,
				latitude: 45.95233,
				longitude: 8.4457,
				address: 'address',
				municipality: 'Collegno',
				province: 'Turin',
				country: 'Italy',
				phoneNumber: '123456789',
				website: 'www.website.com',
				email: 'hut@mail.com',
				creatorID: 6
			};

			const response = await hutAPICall.addHutCall(hut);

			assert.equal(response.status, 422, response.status);
	    });

	    it("POST /huts missing phoneNumber", async () => {
			const hut = {
				name: 'hut',
				description: 'hut',
				altitude: 100,
				latitude: 45.95233,
				longitude: 8.4457,
				address: 'address',
				municipality: 'Collegno',
				province: 'Turin',
				country: 'Italy',
				bedspace: 50,
				website: 'www.website.com',
				email: 'hut@mail.com',
				creatorID: 6
			};

			const response = await hutAPICall.addHutCall(hut);

			assert.equal(response.status, 422, response.status);
	    });

	    it("POST /huts missing website", async () => {
			const hut = {
				name: 'hut',
				description: 'hut',
				altitude: 100,
				latitude: 45.95233,
				longitude: 8.4457,
				address: 'address',
				municipality: 'Collegno',
				province: 'Turin',
				country: 'Italy',
				bedspace: 50,
				phoneNumber: '123456789',
				email: 'hut@mail.com',
				creatorID: 6
			};

			const response = await hutAPICall.addHutCall(hut);

			assert.equal(response.status, 201, response.status);
	    });

	    it("POST /huts missing creatorID", async () => {
			const hut = {
				name: 'hut',
				description: 'hut',
				altitude: 100,
				latitude: 45.95233,
				longitude: 8.4457,
				address: 'address',
				municipality: 'Collegno',
				province: 'Turin',
				country: 'Italy',
				bedspace: 50,
				phoneNumber: '123456789',
				website: 'www.website.com',
				email: 'hut@mail.com',
			};

			const response = await hutAPICall.addHutCall(hut);

			assert.equal(response.status, 422, response.status);
	    });
	});

	describe('Deleting hut', () => {
		it('DELETE /huts/:hutID', async () => {
			await dbManager.addHuts();

			let response = await hutAPICall.deleteHutCall(2);

			assert.equal(response.status, 204, response.status);
		});

		it('DELETE /huts/:hutID NaN', async () => {
			let response = await hutAPICall.deleteHutCall('invalid');

			assert.equal(response.status, 500, response.status);
		});

		it('DELETE /huts/:hutID non existing', async () => {
			await dbManager.addHuts();

			let response = await hutAPICall.deleteHutCall(4);

			assert.equal(response.status, 500, response.status);
		});
	});

	describe('Getting hut image', () => {
		it('GET /huts/:hutID/image', async () => {
			await dbManager.addHuts();

			let response = await hutAPICall.getHutImageCall(1);
			let data = await response.data;

			assert.equal(response.status, 200, response.status);
			assert.deepEqual(data.image, 'data:image/jpeg;base64/adugfasjdfbsfjkvafigafuiagewfibasalfbsiuufgsbvnlkbkvuiegfoegfsvsk');
		});

		it('GET /huts/:hutID/image invalid hutID NaN', async () => {
			let response = await hutAPICall.getHutImageCall('invalid');

			assert.equal(response.status, 500, response.status);
		});

		it('GET /huts/:hutID/image invalid hutID non existing', async () => {
			await dbManager.addHuts();

			let response = await hutAPICall.getHutImageCall(4);

			assert.equal(response.status, 500, response.status);
		});
	});

	describe('Adding hut image', () => {
		it('POST /huts/:hutID/image invalid hutID NaN', async () => {
			const image = 'data:image/jpeg;base64/hvfkjbseksjvjbavlkbfkawbgfkjvkajvbiwueuebvkrvuebv';

			let response = await hutAPICall.addHutImageCall('invalid', image);

			assert.equal(response.status, 422, response.status);
		});
	});
});