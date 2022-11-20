const userDAO = require("../DAO/UserDAO")

class UserController {
    constructor() {
        console.log("Controller started");
    }

    async login(email, password) {
        const user = await userDAO.getUser(email, password)
            .catch(() => { throw Error(); });

        console.log("it worked", user)


        return user;
    }

    async register(name, surname, email, phoneNumber, type, password) {

        const user = await userDAO.Register(name, surname, email, phoneNumber, type, password)
            .catch(err => { throw Error(err) })


        return user;

    }


}

module.exports = UserController