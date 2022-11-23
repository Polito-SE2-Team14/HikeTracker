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

    async register(newUser) {

        console.log(newUser)

        const user = await userDAO.Register(newUser)
            .catch(err => { throw Error(err) })


        return user;

    }


}

module.exports = UserController