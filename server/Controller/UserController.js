const userDAO = require("../DAO/UserDAO")

class UserController {
    constructor() {
    }

    async login(email, password) {
        const user = await userDAO.getUser(email, password)
            .catch(() => { throw Error(); });


        return user;
    }

    async register(newUser) {

        const user = await userDAO.Register(newUser)
            .catch(err => { throw Error(err) })


        return user;

    }


}

module.exports = UserController