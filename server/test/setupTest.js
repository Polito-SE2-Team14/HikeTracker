'use strict';

const chai = require('chai');
const assert = chai.assert;

const Singleton = require("../database/DBManagerSingleton");
const DBManager = require("../database/DBManager");
/** @type {DBManager} */
const dbManager = Singleton.getInstance();

const SingletonTest = require("./SingletonTest")
SingletonTest.getInstance();

before('starting tests', async () => await dbManager.clearDb());

afterEach('clearing DB', async () => await dbManager.clearDb());