const DBManager = require('./DBManager')
class Singleton {

    static #instance = null;
    static #testInstance = false;

    static getInstance() {
        if (this.#instance == null) {
            this.#instance = new DBManager("myDB")
        }
        return this.#instance;
    }

    static getTestInstance() {
        if (this.#instance == null || !this.#testInstance) {
            this.#instance = new DBManager("testDB")
            this.#testInstance = true
        }
        return this.#instance;
    }
}


module.exports =  Singleton