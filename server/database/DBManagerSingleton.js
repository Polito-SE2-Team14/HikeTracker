const DBManager = require('./DBManager')
class Singleton {

    static #instance = null;
    static #testInstance = null;

    static getInstance() {
        if (this.#instance == null) {
            this.#instance = new DBManager("myDB")
        }
        return this.#instance;
    }

    static getTestInstance() {
        if (this.#testInstance == null) {
            this.#testInstance = new DBManager("testDB")
        }
        return this.#testInstance;
    }



}


module.exports =  Singleton