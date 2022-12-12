class SingletonTest {

    static #instance = null;

    static getInstance() {
        if (this.#instance == null) {
            const app = require('../server')
            this.#instance = true
        }
    }
}


module.exports = SingletonTest