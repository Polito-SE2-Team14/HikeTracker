const DBManager = require('./DBManager')
class Singleton {

    static #instance = null;

    static #test = true;

    static getInstance() {
        if (this.#instance == null) {
            if (this.#test === true)
                this.#instance = new DBManager("./dbFiles/testDB")
            else this.#instance = new DBManager("myDB")
        }
        return this.#instance;
    }
}


module.exports = Singleton