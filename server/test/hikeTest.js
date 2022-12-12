'use strict';

const chai = require('chai');
const assert = chai.assert;

const HikeAPICall = require('./APICalls/hikeAPICalls');
const hikeAPICall = new HikeAPICall();


const Singleton = require("../database/DBManagerSingleton");
const DBManager = require("../database/DBManager");
/** @type {DBManager} */
const dbManager = Singleton.getInstance();

let huts;
let referencePoints;

before('creating users for hike tests', async () => {
	await dbManager.clearDb();
	await dbManager.addUsers();
	huts = await dbManager.addHuts();
	referencePoints = await dbManager.addReferencePoints();
});

beforeEach('clearing hikes', async () => {
	await dbManager.deleteAllHikes();
	await dbManager.deleteLinksToHuts();
});

after('finished hike tests', async () => await dbManager.clearDb());

describe('Hikes test suite', () => {
	describe("Getting hikes", () => {
		it('GET /hikes empty', async () => {
			const response = await hikeAPICall.getHikesCall();
			const data = await response.data;

			assert.equal(response.status, 200, response.status);
			assert.deepEqual(data, []);
		});

		it('GET /hikes not empty', async () => {
			const expectedData = await dbManager.addHikes();

			const response = await hikeAPICall.getHikesCall();
			const data = await response.data;

			assert.equal(response.status, 200, response.status);
			assert.deepEqual(data, expectedData);
		});

		it('GET /hikes without track', async () => {
			await dbManager.addHikes(false);

			const response = await hikeAPICall.getHikesCall();

			assert.equal(response.status, 500, response.status);
		});

		it('GET /hikes/:hikeID', async () => {
			const expectedData = await dbManager.addHikes(false);

			let response = await hikeAPICall.getHikeCall(1);
			let data = await response.data;

			assert.equal(response.status, 200, response.status);
			assert.deepEqual(data, expectedData[0]);

			response = await hikeAPICall.getHikeCall(3);
			data = await response.data;

			assert.equal(response.status, 200, response.status);
			assert.deepEqual(data, expectedData[2]);
		});

		it('GET /hikes/:hikeID NaN', async () => {
			const response = await hikeAPICall.getHikeCall('invalid');

			assert.equal(response.status, 500, response.status);
		});

		it('GET /hikes/:hikeID non existing hike', async () => {
			await dbManager.addHikes(false);

			const response = await hikeAPICall.getHikeCall(5);

			assert.equal(response.status, 500, response.status);
		});
	});

	describe('Getting track', () => {
		it('GET /hikes/:hikeID/track', async () => {
			const expectedData = await dbManager.addHikes();

			let response = await hikeAPICall.getHikeTrackCall(1);
			let data = await response.data;

			assert.equal(response.status, 200, response.status);
			assert.deepEqual(data, expectedData[0].track);

			response = await hikeAPICall.getHikeTrackCall(3);
			data = await response.data;

			assert.equal(response.status, 200, response.status);
			assert.deepEqual(data, expectedData[2].track);
		});

		it('GET /hikes/:hikeID/track NaN', async () => {
			const response = await hikeAPICall.getHikeTrackCall('invalid');

			assert.equal(response.status, 500, response.status);
		});

		it('GET /hikes/:hikeID/track non existing hike', async () => {
			await dbManager.addHikes();

			const response = await hikeAPICall.getHikeTrackCall(5);

			assert.equal(response.status, 500, response.status);
		});
	});

	describe('Getting huts close to an hike', () => {
		it('GET /hikes/:hikeID/huts empty', async () => {
			await dbManager.addHikes();

			let response = await hikeAPICall.getCloseHutsCall(1);
			let data = await response.data;

			assert.equal(response.status, 201, response.status);
			assert.deepEqual(data, []);
		});

	it('GET /hikes/:hikeID/huts not empty', async () => {
		await dbManager.addHikes();

		const expectedData = huts.map(hut => {
			return {
				pointID: hut.pointID,
				name: hut.name,
				description: hut.description,
				altitude: hut.altitude,
				latitude: hut.latitude,
				longitude: hut.longitude,
				address: hut.address,
				municipality: hut.municipality,
				province: hut.province,
				country: hut.country,
				bedspace: hut.bedspace,
				phoneNumber: hut.phoneNumber,
				website: hut.website,
				email: hut.email,
				creatorID: hut.creatorID
			};
		});

		let response = await hikeAPICall.getCloseHutsCall(3);
		let data = await response.data;

		assert.equal(response.status, 201, response.status);
		assert.deepEqual(data, expectedData);
	});

		it('GET /hikes/:hikeID/huts NaN', async () => {
			const response = await hikeAPICall.getCloseHutsCall('invalid');

			assert.equal(response.status, 422, response.status);
		});

		it('GET /hikes/:hikeID/huts non existing hike', async () => {
			await dbManager.addHikes();

			const response = await hikeAPICall.getCloseHutsCall(5);

			assert.equal(response.status, 500, response.status);
		});
	});

	describe('Linking huts to an hike', () => {
		it('POST /hikes/:hikeID/huts/:hutID', async () => {
			await dbManager.addHikes();

			const expectedData = {
				hutID: '1',
				hikeID: '3'
			};

			let response = await hikeAPICall.linkHutCall(3, 1);
			let data = await response.data;

			assert.equal(response.status, 201, response.status);
			assert.deepEqual(data, expectedData);
		});

		it('POST /hikes/:hikeID/huts/:hutID NaN', async () => {
			let response = await hikeAPICall.linkHutCall('invalid', 1);

			assert.equal(response.status, 422, response.status);

			response = await hikeAPICall.linkHutCall(3, 'invalid');

			assert.equal(response.status, 422, response.status);
		});

		it('POST /hikes/:hikeID/huts/:hutID non existing', async () => {
			await dbManager.addHikes();

			let response = await hikeAPICall.linkHutCall(4, 1);

			assert.equal(response.status, 500, response.status);

			response = await hikeAPICall.linkHutCall(3, 10);

			assert.equal(response.status, 500, response.status);
		});
	});

	describe('Deleting hike-hut link', () => {
		it('DELETE /hikes/:hikeID/huts/:hutID', async () => {
			await dbManager.addHikes();
			await dbManager.linkHutsToHike();

			const expectedData = [
				{
					hutID: '1',
					hikeID: '3'
				},
				{
					hutID: '3',
					hikeID: '3'
				}
			];

			let response = await hikeAPICall.deleteLinkToHutCall(3, 1);
			let data = await response.data;

			assert.equal(response.status, 201, response.status);
			assert.deepEqual(data, expectedData[0]);

			response = await hikeAPICall.deleteLinkToHutCall(3, 3);
			data = await response.data;

			assert.equal(response.status, 201, response.status);
			assert.deepEqual(data, expectedData[1]);
		});

		it('DELETE /hikes/:hikeID/huts/:hutID NaN', async () => {
			let response = await hikeAPICall.deleteLinkToHutCall('invalid', 1);

			assert.equal(response.status, 422, response.status);

			response = await hikeAPICall.deleteLinkToHutCall(3, 'invalid');

			assert.equal(response.status, 422, response.status);
		});
	});

	describe('Getting reference points of an hike', () => {
		it('GET /hikes/:hikeID/referencePoints empty', async () => {
			await dbManager.addHikes();

			let response = await hikeAPICall.getReferencePointsCall(2);
			let data = await response.data;

			assert.equal(response.status, 201, response.status);
			assert.deepEqual(data, []);
		});

		it('GET /hikes/:hikeID/referencePoints not empty', async () => {
			await dbManager.addHikes();

			const expectedData = referencePoints;

			let response = await hikeAPICall.getReferencePointsCall(1);
			let data = await response.data;

			assert.equal(response.status, 201, response.status);
			assert.deepEqual(data, expectedData);
		});

		it('GET /hikes/:hikeID/referencePoints NaN', async () => {
			await dbManager.addHikes();

			let response = await hikeAPICall.getReferencePointsCall('invalid');

			assert.equal(response.status, 422, response.status);
		});

		// it('GET /hikes/:hikeID/referencePoints non existing', async () => {
		// 	await dbManager.addHikes();

		// 	let response = await hikeAPICall.getReferencePointsCall(4);

		// 	assert.equal(response.status, 500, response.status);
		// });
	});

	describe("Creating a new hike", () => {
		it('POST /hikes', async () => {
			const hike = {
				title: "hike",
				length: 10,
				expectedTime: 11,
				ascent: 12,
				difficulty: "Hiker",
				startPointID: 1,
				endPointID: 4,
				description: "test description",
				municipality: "Collegno",
				province: "Turin",
				country: 'Italy',
				creatorID: 6,
				track: [[45.91284, 8.38543], [45.91274, 8.38543], [45.91274, 8.38541]]
			};

			let response = await hikeAPICall.addHikeCall(hike);
			let data = await response.data;

			assert.equal(response.status, 201, response.status);
			assert.deepEqual(data.hikeID, 1);

			hike.difficulty = 'Tourist';

			response = await hikeAPICall.addHikeCall(hike);
			data = await response.data;

			assert.equal(response.status, 201, response.status);
			assert.deepEqual(data.hikeID, 2);

			hike.difficulty = 'Professional Hiker';

			response = await hikeAPICall.addHikeCall(hike);
			data = await response.data;

			assert.equal(response.status, 201, response.status);
			assert.deepEqual(data.hikeID, 3);
		});

		it('POST /hikes missing body', async () => {
			let response = await hikeAPICall.addHikeCall(null);

			assert.equal(response.status, 400, response.status);

			response = await hikeAPICall.addHikeCall(undefined);

			assert.equal(response.status, 422, response.status);
		});

	it('POST /hikes wrong title', async () => {
		const hike = {
			title: null,
			length: 10,
			expectedTime: 11,
			ascent: 12,
			difficulty: "Hiker",
			startPointID: 1,
			endPointID: 4,
			description: "test description",
			municipality: "Collegno",
			province: "Turin",
			country: 'Italy',
			creatorID: 6,
			track: [[45.91284, 8.38543], [45.91274, 8.38543], [45.91274, 8.38541]]
		};

		let response = await hikeAPICall.addHikeCall(hike);

		assert.equal(response.status, 422, response.status);
	});

		it('POST /hikes wrong length', async () => {
			const hike = {
				title: "hike",
				length: 'invalid',
				expectedTime: 11,
				ascent: 12,
				difficulty: "Hiker",
				startPointID: 1,
				endPointID: 4,
				description: "test description",
				municipality: "Collegno",
				province: "Turin",
				country: 'Italy',
				creatorID: 6,
				track: [[45.91284, 8.38543], [45.91274, 8.38543], [45.91274, 8.38541]]
			};

			let response = await hikeAPICall.addHikeCall(hike);

			assert.equal(response.status, 500, response.status);
		});

		it('POST /hikes wrong expectedTime', async () => {
			const hike = {
				title: "hike",
				length: 10,
				expectedTime: 'invalid',
				ascent: 12,
				difficulty: "Hiker",
				startPointID: 1,
				endPointID: 4,
				description: "test description",
				municipality: "Collegno",
				province: "Turin",
				country: 'Italy',
				creatorID: 6,
				track: [[45.91284, 8.38543], [45.91274, 8.38543], [45.91274, 8.38541]]
			};

			let response = await hikeAPICall.addHikeCall(hike);

			assert.equal(response.status, 500, response.status);
		});

		it('POST /hikes wrong ascent', async () => {
			const hike = {
				title: "hike",
				length: 10,
				expectedTime: 11,
				ascent: 'invalid',
				difficulty: "Hiker",
				startPointID: 1,
				endPointID: 4,
				description: "test description",
				municipality: "Collegno",
				province: "Turin",
				country: 'Italy',
				creatorID: 6,
				track: [[45.91284, 8.38543], [45.91274, 8.38543], [45.91274, 8.38541]]
			};

			let response = await hikeAPICall.addHikeCall(hike);

			assert.equal(response.status, 500, response.status);
		});

		it('POST /hikes wrong difficulty', async () => {
			const hike = {
				title: "hike",
				length: 10,
				expectedTime: 11,
				ascent: 12,
				difficulty: 'invalid',
				startPointID: 1,
				endPointID: 4,
				description: "test description",
				municipality: "Collegno",
				province: "Turin",
				country: 'Italy',
				creatorID: 6,
				track: [[45.91284, 8.38543], [45.91274, 8.38543], [45.91274, 8.38541]]
			};

			let response = await hikeAPICall.addHikeCall(hike);

			assert.equal(response.status, 500, response.status);
		});

		// it('POST /hikes wrong startPointID', async () => {

		// });

		// it('POST /hikes wrong endPointID', async () => {

		// });

		it('POST /hikes wrong description', async () => {
			const hike = {
				title: "hike",
				length: 10,
				expectedTime: 11,
				ascent: 12,
				difficulty: "Hiker",
				startPointID: 1,
				endPointID: 4,
				description: null,
				municipality: "Collegno",
				province: "Turin",
				country: 'Italy',
				creatorID: 6,
				track: [[45.91284, 8.38543], [45.91274, 8.38543], [45.91274, 8.38541]]
			};

			let response = await hikeAPICall.addHikeCall(hike);
			let data = await response.data;

			assert.equal(response.status, 201, response.status);
			assert.deepEqual(data.hikeID, 1);
		});

		it('POST /hikes wrong municipality', async () => {
			const hike = {
				title: "hike",
				length: 10,
				expectedTime: 11,
				ascent: 12,
				difficulty: "Hiker",
				startPointID: 1,
				endPointID: 4,
				description: "test description",
				municipality: null,
				province: "Turin",
				country: 'Italy',
				creatorID: 6,
				track: [[45.91284, 8.38543], [45.91274, 8.38543], [45.91274, 8.38541]]
			};

			let response = await hikeAPICall.addHikeCall(hike);

			assert.equal(response.status, 422, response.status);
		});

		it('POST /hikes wrong province', async () => {
			const hike = {
				title: "hike",
				length: 10,
				expectedTime: 11,
				ascent: 12,
				difficulty: "Hiker",
				startPointID: 1,
				endPointID: 4,
				description: "test description",
				municipality: "Collegno",
				province: null,
				country: 'Italy',
				creatorID: 6,
				track: [[45.91284, 8.38543], [45.91274, 8.38543], [45.91274, 8.38541]]
			};

			let response = await hikeAPICall.addHikeCall(hike);

			assert.equal(response.status, 422, response.status);
		});

		it('POST /hikes wrong country', async () => {
			const hike = {
				title: "hike",
				length: 10,
				expectedTime: 11,
				ascent: 12,
				difficulty: "Hiker",
				startPointID: 1,
				endPointID: 4,
				description: "test description",
				municipality: "Collegno",
				province: "Turin",
				country: null,
				creatorID: 6,
				track: [[45.91284, 8.38543], [45.91274, 8.38543], [45.91274, 8.38541]]
			};

			let response = await hikeAPICall.addHikeCall(hike);

			assert.equal(response.status, 500, response.status);
		});

		it('POST /hikes wrong creatorID', async () => {
			const hike = {
				title: "hike",
				length: 10,
				expectedTime: 11,
				ascent: 12,
				difficulty: "Hiker",
				startPointID: 1,
				endPointID: 4,
				description: "test description",
				municipality: "Collegno",
				province: "Turin",
				country: 'Italy',
				creatorID: 'invalid',
				track: [[45.91284, 8.38543], [45.91274, 8.38543], [45.91274, 8.38541]]
			};

			let response = await hikeAPICall.addHikeCall(hike);

			assert.equal(response.status, 500, response.status);
		});

		// it('POST /hikes wrong track', async () => {

		// });

		it('POST /hikes missing title', async () => {
			const hike = {
				length: 10,
				expectedTime: 11,
				ascent: 12,
				difficulty: "Hiker",
				startPointID: 1,
				endPointID: 4,
				description: "test description",
				municipality: "Collegno",
				province: "Turin",
				country: 'Italy',
				creatorID: 6,
				track: [[45.91284, 8.38543], [45.91274, 8.38543], [45.91274, 8.38541]]
			};

			let response = await hikeAPICall.addHikeCall(hike);

			assert.equal(response.status, 422, response.status);
		});

		it('POST /hikes missing length', async () => {
			const hike = {
				title: "hike",
				expectedTime: 11,
				ascent: 12,
				difficulty: "Hiker",
				startPointID: 1,
				endPointID: 4,
				description: "test description",
				municipality: "Collegno",
				province: "Turin",
				country: 'Italy',
				creatorID: 6,
				track: [[45.91284, 8.38543], [45.91274, 8.38543], [45.91274, 8.38541]]
			};

			let response = await hikeAPICall.addHikeCall(hike);

			assert.equal(response.status, 500, response.status);
		});

		it('POST /hikes missing expectedTime', async () => {
			const hike = {
				title: "hike",
				length: 10,
				ascent: 12,
				difficulty: "Hiker",
				startPointID: 1,
				endPointID: 4,
				description: "test description",
				municipality: "Collegno",
				province: "Turin",
				country: 'Italy',
				creatorID: 6,
				track: [[45.91284, 8.38543], [45.91274, 8.38543], [45.91274, 8.38541]]
			};

			let response = await hikeAPICall.addHikeCall(hike);

			assert.equal(response.status, 500, response.status);
		});

		it('POST /hikes missing ascent', async () => {
			const hike = {
				title: "hike",
				length: 10,
				expectedTime: 11,
				difficulty: "Hiker",
				startPointID: 1,
				endPointID: 4,
				description: "test description",
				municipality: "Collegno",
				province: "Turin",
				country: 'Italy',
				creatorID: 6,
				track: [[45.91284, 8.38543], [45.91274, 8.38543], [45.91274, 8.38541]]
			};

			let response = await hikeAPICall.addHikeCall(hike);

			assert.equal(response.status, 500, response.status);
		});

		it('POST /hikes missing difficulty', async () => {
			const hike = {
				title: "hike",
				length: 10,
				expectedTime: 11,
				ascent: 12,
				startPointID: 1,
				endPointID: 4,
				description: "test description",
				municipality: "Collegno",
				province: "Turin",
				country: 'Italy',
				creatorID: 6,
				track: [[45.91284, 8.38543], [45.91274, 8.38543], [45.91274, 8.38541]]
			};

			let response = await hikeAPICall.addHikeCall(hike);

			assert.equal(response.status, 422, response.status);
		});

		// it('POST /hikes missing startPointID', async () => {

		// });

		// it('POST /hikes missing endPointID', async () => {

		// });

		it('POST /hikes missing description', async () => {
			const hike = {
				title: "hike",
				length: 10,
				expectedTime: 11,
				ascent: 12,
				difficulty: "Hiker",
				startPointID: 1,
				endPointID: 4,
				municipality: "Collegno",
				province: "Turin",
				country: 'Italy',
				creatorID: 6,
				track: [[45.91284, 8.38543], [45.91274, 8.38543], [45.91274, 8.38541]]
			};

			let response = await hikeAPICall.addHikeCall(hike);

			assert.equal(response.status, 500, response.status);
		});

		it('POST /hikes missing municipality', async () => {
			const hike = {
				title: "hike",
				length: 10,
				expectedTime: 11,
				ascent: 12,
				difficulty: "Hiker",
				startPointID: 1,
				endPointID: 4,
				description: "test description",
				province: "Turin",
				country: 'Italy',
				creatorID: 6,
				track: [[45.91284, 8.38543], [45.91274, 8.38543], [45.91274, 8.38541]]
			};

			let response = await hikeAPICall.addHikeCall(hike);

			assert.equal(response.status, 422, response.status);
		});

		it('POST /hikes missing province', async () => {
			const hike = {
				title: "hike",
				length: 10,
				expectedTime: 11,
				ascent: 12,
				difficulty: "Hiker",
				startPointID: 1,
				endPointID: 4,
				description: "test description",
				municipality: "Collegno",
				country: 'Italy',
				creatorID: 6,
				track: [[45.91284, 8.38543], [45.91274, 8.38543], [45.91274, 8.38541]]
			};

			let response = await hikeAPICall.addHikeCall(hike);

			assert.equal(response.status, 422, response.status);
		});

		it('POST /hikes missing country', async () => {
			const hike = {
				title: "hike",
				length: 10,
				expectedTime: 11,
				ascent: 12,
				difficulty: "Hiker",
				startPointID: 1,
				endPointID: 4,
				description: "test description",
				municipality: "Collegno",
				province: "Turin",
				creatorID: 6,
				track: [[45.91284, 8.38543], [45.91274, 8.38543], [45.91274, 8.38541]]
			};

			let response = await hikeAPICall.addHikeCall(hike);

			assert.equal(response.status, 500, response.status);
		});

		it('POST /hikes missing creatorID', async () => {
			const hike = {
				title: "hike",
				length: 10,
				expectedTime: 11,
				ascent: 12,
				difficulty: "Hiker",
				startPointID: 1,
				endPointID: 4,
				description: "test description",
				municipality: "Collegno",
				province: "Turin",
				country: 'Italy',
				track: [[45.91284, 8.38543], [45.91274, 8.38543], [45.91274, 8.38541]]
			};

			let response = await hikeAPICall.addHikeCall(hike);

			assert.equal(response.status, 500, response.status);
		});

		// it('POST /hikes missing track', async () => {

		// });
	});

	describe('Creating reference points for an hike', () => {
		it('POST /hikes/referencePoints', async () => {
			const referencePoint = {
				name: 'point',
				description: 'description',
				altitude: 100,
				latitude: 45.95929,
				longitude: 8.44804,
				address: 'address',
				municipality: 'Collegno',
				province: 'Turin',
				country: 'Italy',
				creatorID: 6
			};

			await dbManager.addHikes();

			let response = await hikeAPICall.addReferencePointCall(3, referencePoint);

			assert.equal(response.status, 201, response.status);
		});

		it('POST /hikes/referencePoints NaN', async () => {
			const referencePoint = {
				name: 'point',
				description: 'description',
				altitude: 100,
				latitude: 45.95929,
				longitude: 8.44804,
				address: 'address',
				municipality: 'Collegno',
				province: 'Turin',
				country: 'Italy',
				creatorID: 6
			};

			let response = await hikeAPICall.addReferencePointCall('invalid', referencePoint);

			assert.equal(response.status, 422, response.status);
		});

		it('POST /hikes/referencePoints missing body', async () => {
			await dbManager.addHikes();

			let response = await hikeAPICall.addReferencePointCall(3, null);

			assert.equal(response.status, 422, response.status);

			response = await hikeAPICall.addReferencePointCall(3, undefined);

			assert.equal(response.status, 422, response.status);
		});

		it('POST /hikes/referencePoints wrong name', async () => {
			const referencePoint = {
				name: null,
				description: 'description',
				altitude: 100,
				latitude: 45.95929,
				longitude: 8.44804,
				address: 'address',
				municipality: 'Collegno',
				province: 'Turin',
				country: 'Italy',
				creatorID: 6
			};

			await dbManager.addHikes();

			let response = await hikeAPICall.addReferencePointCall(3, referencePoint);

			assert.equal(response.status, 422, response.status);
		});

		it('POST /hikes/referencePoints wrong description', async () => {
			const referencePoint = {
				name: 'point',
				description: null,
				altitude: 100,
				latitude: 45.95929,
				longitude: 8.44804,
				address: 'address',
				municipality: 'Collegno',
				province: 'Turin',
				country: 'Italy',
				creatorID: 6
			};

			await dbManager.addHikes();

			let response = await hikeAPICall.addReferencePointCall(3, referencePoint);

			assert.equal(response.status, 422, response.status);
		});

		it('POST /hikes/referencePoints wrong altitude', async () => {
			const referencePoint = {
				name: 'point',
				description: 'description',
				altitude: 'invalid',
				latitude: 45.95929,
				longitude: 8.44804,
				address: 'address',
				municipality: 'Collegno',
				province: 'Turin',
				country: 'Italy',
				creatorID: 6
			};

			await dbManager.addHikes();

			let response = await hikeAPICall.addReferencePointCall(3, referencePoint);

			assert.equal(response.status, 422, response.status);
		});

		it('POST /hikes/referencePoints wrong latitude', async () => {
			const referencePoint = {
				name: 'point',
				description: 'description',
				altitude: 100,
				latitude: 'invalid',
				longitude: 8.44804,
				address: 'address',
				municipality: 'Collegno',
				province: 'Turin',
				country: 'Italy',
				creatorID: 6
			};

			await dbManager.addHikes();

			let response = await hikeAPICall.addReferencePointCall(3, referencePoint);

			assert.equal(response.status, 422, response.status);
		});

		it('POST /hikes/referencePoints wrong longitude', async () => {
			const referencePoint = {
				name: 'point',
				description: 'description',
				altitude: 100,
				latitude: 45.95929,
				longitude: 'invalid',
				address: 'address',
				municipality: 'Collegno',
				province: 'Turin',
				country: 'Italy',
				creatorID: 6
			};

			await dbManager.addHikes();

			let response = await hikeAPICall.addReferencePointCall(3, referencePoint);

			assert.equal(response.status, 422, response.status);
		});

		// it('POST /hikes/referencePoints wrong address', async () => {
		// 	const referencePoint = {
		// 		name: 'point',
		// 		description: 'description',
		// 		altitude: 100,
		// 		latitude: 45.95929,
		// 		longitude: 8.44804,
		// 		address: null,
		// 		municipality: 'Collegno',
		// 		province: 'Turin',
		// 		country: 'Italy',
		// 		creatorID: 6
		// 	};

		// 	await dbManager.addHikes();

		// 	let response = await hikeAPICall.addReferencePointCall(3, referencePoint);

		// 	assert.equal(response.status, 422, response.status);
		// });

		it('POST /hikes/referencePoints wrong municipality', async () => {
			const referencePoint = {
				name: 'point',
				description: 'description',
				altitude: 100,
				latitude: 45.95929,
				longitude: 8.44804,
				address: 'address',
				municipality: null,
				province: 'Turin',
				country: 'Italy',
				creatorID: 6
			};

			await dbManager.addHikes();

			let response = await hikeAPICall.addReferencePointCall(3, referencePoint);

			assert.equal(response.status, 422, response.status);
		});

		it('POST /hikes/referencePoints wrong province', async () => {
			const referencePoint = {
				name: 'point',
				description: 'description',
				altitude: 100,
				latitude: 45.95929,
				longitude: 8.44804,
				address: 'address',
				municipality: 'Collegno',
				province: null,
				country: 'Italy',
				creatorID: 6
			};

			await dbManager.addHikes();

			let response = await hikeAPICall.addReferencePointCall(3, referencePoint);

			assert.equal(response.status, 422, response.status);
		});

		it('POST /hikes/referencePoints wrong country', async () => {
			const referencePoint = {
				name: 'point',
				description: 'description',
				altitude: 100,
				latitude: 45.95929,
				longitude: 8.44804,
				address: 'address',
				municipality: 'Collegno',
				province: 'Turin',
				country: null,
				creatorID: 6
			};

			await dbManager.addHikes();

			let response = await hikeAPICall.addReferencePointCall(3, referencePoint);

			assert.equal(response.status, 422, response.status);
		});

		it('POST /hikes/referencePoints wrong creatorID', async () => {
			const referencePoint = {
				name: 'point',
				description: 'description',
				altitude: 100,
				latitude: 45.95929,
				longitude: 8.44804,
				address: 'address',
				municipality: 'Collegno',
				province: 'Turin',
				country: 'Italy',
				creatorID: 'invalid'
			};

			await dbManager.addHikes();

			let response = await hikeAPICall.addReferencePointCall(3, referencePoint);

			assert.equal(response.status, 422, response.status);
		});

		it('POST /hikes/referencePoints missing name', async () => {
			const referencePoint = {
				description: 'description',
				altitude: 100,
				latitude: 45.95929,
				longitude: 8.44804,
				address: 'address',
				municipality: 'Collegno',
				province: 'Turin',
				country: 'Italy',
				creatorID: 6
			};

			await dbManager.addHikes();

			let response = await hikeAPICall.addReferencePointCall(3, referencePoint);

			assert.equal(response.status, 422, response.status);
		});

		it('POST /hikes/referencePoints missing description', async () => {
			const referencePoint = {
				name: 'point',
				altitude: 100,
				latitude: 45.95929,
				longitude: 8.44804,
				address: 'address',
				municipality: 'Collegno',
				province: 'Turin',
				country: 'Italy',
				creatorID: 6
			};

			await dbManager.addHikes();

			let response = await hikeAPICall.addReferencePointCall(3, referencePoint);

			assert.equal(response.status, 422, response.status);
		});

		it('POST /hikes/referencePoints missing altitude', async () => {
			const referencePoint = {
				name: 'point',
				description: 'description',
				latitude: 45.95929,
				longitude: 8.44804,
				address: 'address',
				municipality: 'Collegno',
				province: 'Turin',
				country: 'Italy',
				creatorID: 6
			};

			await dbManager.addHikes();

			let response = await hikeAPICall.addReferencePointCall(3, referencePoint);

			assert.equal(response.status, 422, response.status);
		});

		it('POST /hikes/referencePoints missing latitude', async () => {
			const referencePoint = {
				name: 'point',
				description: 'description',
				altitude: 100,
				longitude: 8.44804,
				address: 'address',
				municipality: 'Collegno',
				province: 'Turin',
				country: 'Italy',
				creatorID: 6
			};

			await dbManager.addHikes();

			let response = await hikeAPICall.addReferencePointCall(3, referencePoint);

			assert.equal(response.status, 422, response.status);
		});

		it('POST /hikes/referencePoints missing longitude', async () => {
			const referencePoint = {
				name: 'point',
				description: 'description',
				altitude: 100,
				latitude: 45.95929,
				address: 'address',
				municipality: 'Collegno',
				province: 'Turin',
				country: 'Italy',
				creatorID: 6
			};

			await dbManager.addHikes();

			let response = await hikeAPICall.addReferencePointCall(3, referencePoint);

			assert.equal(response.status, 422, response.status);
		});

		// it('POST /hikes/referencePoints missing address', async () => {
		// 	const referencePoint = {
		// 		name: 'point',
		// 		description: 'description',
		// 		altitude: 100,
		// 		latitude: 45.95929,
		// 		longitude: 8.44804,
		// 		municipality: 'Collegno',
		// 		province: 'Turin',
		// 		country: 'Italy',
		// 		creatorID: 6
		// 	};

		// 	await dbManager.addHikes();

		// 	let response = await hikeAPICall.addReferencePointCall(3, referencePoint);

		// 	assert.equal(response.status, 422, response.status);
		// });

		it('POST /hikes/referencePoints missing municipality', async () => {
			const referencePoint = {
				name: 'point',
				description: 'description',
				altitude: 100,
				latitude: 45.95929,
				longitude: 8.44804,
				address: 'address',
				province: 'Turin',
				country: 'Italy',
				creatorID: 6
			};

			await dbManager.addHikes();

			let response = await hikeAPICall.addReferencePointCall(3, referencePoint);

			assert.equal(response.status, 422, response.status);
		});

		it('POST /hikes/referencePoints missing province', async () => {
			const referencePoint = {
				name: 'point',
				description: 'description',
				altitude: 100,
				latitude: 45.95929,
				longitude: 8.44804,
				address: 'address',
				municipality: 'Collegno',
				country: 'Italy',
				creatorID: 6
			};

			await dbManager.addHikes();

			let response = await hikeAPICall.addReferencePointCall(3, referencePoint);

			assert.equal(response.status, 422, response.status);
		});

		it('POST /hikes/referencePoints missing country', async () => {
			const referencePoint = {
				name: 'point',
				description: 'description',
				altitude: 100,
				latitude: 45.95929,
				longitude: 8.44804,
				address: 'address',
				municipality: 'Collegno',
				province: 'Turin',
				creatorID: 6
			};

			await dbManager.addHikes();

			let response = await hikeAPICall.addReferencePointCall(3, referencePoint);

			assert.equal(response.status, 422, response.status);
		});

		it('POST /hikes/referencePoints missing creatorID', async () => {
			const referencePoint = {
				name: 'point',
				description: 'description',
				altitude: 100,
				latitude: 45.95929,
				longitude: 8.44804,
				address: 'address',
				municipality: 'Collegno',
				province: 'Turin',
				country: 'Italy'
			};

			await dbManager.addHikes();

			let response = await hikeAPICall.addReferencePointCall(3, referencePoint);

			assert.equal(response.status, 422, response.status);
		});
	});

	describe('Adding start point to an hike', () => {
		it('POST /hikes/start', async () => {
			await dbManager.addHikes();

			let response = await hikeAPICall.addStartPointCall(2, 2);

			assert.equal(response.status, 201, response.status);
		});

		it('POST /hikes/start NaN', async () => {
			await dbManager.addHikes();

			let response = await hikeAPICall.addStartPointCall('invalid', 2);

			assert.equal(response.status, 422, response.status);

			response = await hikeAPICall.addStartPointCall(2, 'invalid');

			assert.equal(response.status, 422, response.status);
		});

		// it('POST /hikes/start non existing', async () => {
		// 	await dbManager.addHikes();

		// 	let response = await hikeAPICall.addStartPointCall(5, 2);

		// 	assert.equal(response.status, 422, response.status);

		// 	response = await hikeAPICall.addStartPointCall(2, 10);

		// 	assert.equal(response.status, 422, response.status);
		// });
	});

	describe('Adding end point to an hike', () => {
		it('POST /hikes/end', async () => {
			await dbManager.addHikes();

			let response = await hikeAPICall.addEndPointCall(2, 2);

			assert.equal(response.status, 201, response.status);
		});

		it('POST /hikes/end NaN', async () => {
			await dbManager.addHikes();

			let response = await hikeAPICall.addEndPointCall('invalid', 2);

			assert.equal(response.status, 422, response.status);

			response = await hikeAPICall.addEndPointCall(2, 'invalid');

			assert.equal(response.status, 422, response.status);
		});

		// it('POST /hikes/end non existing', async () => {
		// 	await dbManager.addHikes();

		// 	let response = await hikeAPICall.addEndPointCall(5, 2);

		// 	assert.equal(response.status, 422, response.status);

		// 	response = await hikeAPICall.addEndPointCall(2, 10);

		// 	assert.equal(response.status, 422, response.status);
		// });
	});

	describe('Getting huts linked to an hike', () => {
		it('GET /:hikeID/linkedHuts empty', async () => {
			await dbManager.addHikes();

			let response = await hikeAPICall.getLinkedHutsCall(3);
			let data = await response.data;

			assert.equal(response.status, 201, response.status);
			assert.deepEqual(data, []);
		});

		it('GET /:hikeID/linkedHuts not empty', async () => {
			await dbManager.addHikes();

			const expectedData = await dbManager.linkHutsToHike();

			let response = await hikeAPICall.getLinkedHutsCall(3);
			let data = await response.data;

			assert.equal(response.status, 201, response.status);
			assert.deepEqual(data, expectedData);
		});

		it('GET /:hikeID/linkedHuts NaN', async () => {
			let response = await hikeAPICall.getLinkedHutsCall('invalid');

			assert.equal(response.status, 422, response.status);
		});

		// it('GET /:hikeID/linkedHuts non existing', async () => {
		// 	await dbManager.addHikes();

		// 	let response = await hikeAPICall.getLinkedHutsCall(5);

		// 	assert.equal(response.status, 500, response.status);
		// });
	});

	describe('Deleting hike', () => {
		it('DELETE /hikes/:hikeID', async () => {
			await dbManager.addHikes();
			
			let response = await hikeAPICall.deleteHikeCall(2);

			assert.equal(response.status, 201, response.status);
		});
		
		it('DELETE /hikes/:hikeID NaN', async () => {
			await dbManager.addHikes();

			let response = await hikeAPICall.deleteHikeCall('invalid');

			assert.equal(response.status, 404, response.status);
		});

		it('DELETE /hikes/:hikeID non existing', async () => {
			await dbManager.addHikes();

			let response = await hikeAPICall.deleteHikeCall(6);

			assert.equal(response.status, 404, response.status);
		});
	});
});