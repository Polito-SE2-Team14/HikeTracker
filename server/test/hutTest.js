'use strict';

const chai = require('chai');
const assert = chai.assert;

const HutAPICall = require('./APICalls/hutAPICalls');
const hutAPICall = new HutAPICall();


const Singleton = require("../database/DBManagerSingleton")
const DBManager = require("../database/DBManager");
/** @type {DBManager} */
const dbManager = Singleton.getTestInstance();

const Hut = require("../Class/Hut");

describe('Hut test suite', async () => {
    beforeEach(async () => {
    })
    after(async () => {
    })

    describe("Hut creation", async () => {
        it('Valid insertion of new hut', async () => {
            const hutToInsert =
            //new Hut(0, "name", 13214141.5, 13214141.5, "testAddress", 5, 1)
            {
                pointID: 0, name: "name", latitude: 13214141.5, longitude: 13214141.5, municipality: "Moncalieri",
                province: "Turin", address: "testAddress", bedspace: 5, hutOwnerID: 1
            }
            const response = await hutAPICall.addHutCall(hutToInsert);
            //console.log(response)
            assert.equal(response.status, 204)

        })

        it("name invalid", async () => {
            const hutToInsert =
                //new Hut(0, "", 13214141.5, 13214141.5, "testAddress", 5, 1)
                { pointID: 0, name: "", latitude: 13214141.5, longitude: 13214141.5, address: "testAddress", bedspace: 5, hutOwnerID: 1 }
            const response = await hutAPICall.addHutCall(hutToInsert);
            assert.equal(response.status, 422)
        })
        it("latitude invalid", async () => {
            const hutToInsert = new Hut(0, "name", "wadawd.5", 13214141.5, "testAddress", 5, 1)
            const response = await hutAPICall.addHutCall(hutToInsert);
            assert.equal(response.status, 422)
        })
        it("longitude invalid", async () => {
            const hutToInsert = new Hut(0, "name", 13214141.5, "adwadw.5", "testAddress", 5, 1)
            const response = await hutAPICall.addHutCall(hutToInsert);
            assert.equal(response.status, 422)
        })
        it("address invalid", async () => {
            const hutToInsert = new Hut(0, "name", 13214141.5, 13214141.5, "", 5, 1)
            const response = await hutAPICall.addHutCall(hutToInsert);
            assert.equal(response.status, 422)
        })
        it("bedspace invalid", async () => {
            const hutToInsert = new Hut(0, "name", 13214141.5, 13214141.5, "testAddress", "dawdwa", 1)
            const response = await hutAPICall.addHutCall(hutToInsert);
            assert.equal(response.status, 422)
        })
        it("hutOwnerID invalid", async () => {
            const hutToInsert = new Hut(0, "name", 13214141.5, 13214141.5, "testAddress", 5, "dwaawd")
            const response = await hutAPICall.addHutCall(hutToInsert);
            assert.equal(response.status, 422)
        })
    })

});