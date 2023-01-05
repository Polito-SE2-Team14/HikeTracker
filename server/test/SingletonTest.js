class SingletonTest {

    static #instance = null;

    static getInstance() {
        if (this.#instance == null) {
            require('../server')
            this.#instance = true
        }
    }
}


module.exports = SingletonTest