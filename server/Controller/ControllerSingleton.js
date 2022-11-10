const Controller = require('./Controller')

class Singleton{

    static #instance = null;
    
    static getInstance(){
        if(this.#instance == null){
            this.#instance = new Controller()
        }
        return this.#instance;
    }
}

module.exports = Singleton