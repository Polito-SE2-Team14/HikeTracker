const DBManager = require('./DBManager')
class Singleton {

    static #instance = null;

    static getInstance() {
        if (this.#instance == null) {
            this.#instance = new DBManager()
        }
        return this.#instance;
    }
}


module.exports =  Singleton