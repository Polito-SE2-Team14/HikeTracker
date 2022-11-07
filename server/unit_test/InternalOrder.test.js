'use strict';

const { expect } = require('chai');

const dbManager = controller.getDBManager();

beforeEach(async () => {
    await dbManager.deleteAllData();
});

afterEach(async () => {
    await dbManager.deleteAllData();
});

describe('InternalOrderController Tests', () => {
    describe('createInternalOrder method testing', () => {
        test("Successfully add a new Internal Order to Database", async () => {
            let result;
            let currId;
            const body = {
                issueDate: "2022/07/07",
                products: [],
                customerId: 3
            };

            currId = ((await internalOrderController.getAllInternalOrders()).length) + 1;

            await internalOrderController.createInternalOrder(body);

            result = await internalOrderController.getInternalOrder(currId).catch(() => { });

            expect(result).not.to.be.undefined;
        });

        test("Insertion of an Internal Order with malformed date", async () => {
            let result;
            let currId;
            const body = {
                issueDate: "999/999/999",
                products: [],
                customerId: 3
            };

            currId = ((await internalOrderController.getAllInternalOrders()).length) + 1;

            await internalOrderController.createInternalOrder(body).catch(() => { });

            result = await internalOrderController.getInternalOrder(currId).catch(() => { });

            expect(result).to.be.undefined;
        });

        test("Insertion of an Internal Order with invalid customerId", async () => {
            let result;
            let currId;
            const body = {
                issueDate: "2022/07/07",
                products: [],
                customerId: -10
            };

            currId = ((await internalOrderController.getAllInternalOrders()).length) + 1;

            await internalOrderController.createInternalOrder(body).catch(() => { });

            result = await internalOrderController.getInternalOrder(currId).catch(() => { });

            expect(result).to.be.undefined;
        });
    });

    describe('editInternalOrder method testing', () => {
        test("Successfully edit an Internal Order with state = 'ACCEPTED'", async () => {
            let result;
            const body = { newState: "ACCEPTED" };
            let newState;

            await internalOrderController.editInternalOrder(1, body);
            result = await internalOrderController.getInternalOrder(1);
            newState = result['state'];

            expect(newState).to.be.equal("ACCEPTED");
        });

        test("Successfully edit an Internal Order with state = 'COMPLETED'", async () => {
            let result;
            const list = [];
            const body = {
                newState: "COMPLETED",
                products: list
            };
            let newState, prods;

            await internalOrderController.editInternalOrder(1, body);
            result = await internalOrderController.getInternalOrder(1);
            newState = result['state'];
            prods = result['products'];

            expect(newState).to.be.equal("COMPLETED");
        });

        test("Edit an Internal Order with an invalid state", async () => {
            let result;
            const body = { newState: "INVALID_STATE" };
            let oldState, newState;

            result = await internalOrderController.getInternalOrder(1);
            oldState = result['state'];

            await internalOrderController.editInternalOrder(1, body).catch(() => { });
            result = await internalOrderController.getInternalOrder(1);
            newState = result['state'];

            expect(newState).to.be.equal(oldState);
        });

        test("Edit a non-existing Internal Order", async () => {
            let result;
            const body = { newState: "ACCEPTED" };

            result = await internalOrderController.editInternalOrder(-1, body).catch(() => { });
            expect(result).to.be.undefined;
        });
    });

    describe('deleteInternalOrder method testing', () => {
        test("Successfully delete an Internal Order", async () => {
            let result;
            await internalOrderController.deleteInternalOrder(1);

            result = await internalOrderController.getInternalOrder(1).catch(() => { });
            expect(result).to.be.undefined;
        });

        test("Delete a non-existing Internal Order", async () => {
            let oldCount, newCount;

            oldCount = (await internalOrderController.getAllInternalOrders()).length;

            await internalOrderController.deleteInternalOrder(-1).catch(() => { });

            newCount = (await internalOrderController.getAllInternalOrders()).length;

            expect(oldCount).to.be.equal(newCount);
        });
    });

    describe("Get Methods Testing", () => {
        let result;

        test('Get Products in an Internal Order Test', async () => {
            result = await internalOrderController.getProductsForInternalOrder(1);

            expect(result.length).to.be.equal(1);
        });
    });
});