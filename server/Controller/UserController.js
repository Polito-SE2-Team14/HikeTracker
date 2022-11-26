const userDAO = require("../DAO/UserDAO")
const crypto = require("crypto");
const nodemailer = require("nodemailer");

class UserController {
    constructor() {
    }

    async login(email, password) {
        const user = await userDAO.getUser(email, password)
            .catch(() => { throw Error(); });


        return user;
    }

    async getUser(userID) {
        const user = await userDAO.getUserById(userID)
            .catch(() => { throw Error(); });
        return user;
    }

    async register(newUser) {

        let token = crypto.randomBytes(20).toString('hex');
        const user = await userDAO.Register(newUser, token)
            .catch(err => { throw Error(err) });

        //EMAIL VERIFICATION
        await this.sendVerificationEmail(user.token, user.email);

        return user;

    }

    async sendVerificationEmail(token, userEmail) {
        //EMAIL VERIFICATION

        // let testAccount = await nodemailer.createTestAccount();

        // create reusable transporter object using the default SMTP transport
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            auth: {
                user: 'hikefiveteam14@gmail.com',
                pass: 'tywjwgzzhvkrcdcc'
            }
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"HIKEfive" <support@hikefive.com>', // sender address
            to: userEmail, // list of receivers
            subject: "HIKEfive | Verify Email", // Subject line
            html: "<p>You’ve received this message because your email address has been registered with our site. Please click the button below to verify your email address and confirm that you are the owner of this account.</p><p><a href='http://localhost:3000/user/verify/" + token + "'>Verify</a></p>", // html body
        });

        console.log("Message sent: %s", info.messageId);

        return true;

    }

    async verify(token) {
        try {
            let user = await userDAO.getUserByToken(token);
            await userDAO.verifyUser(user.userID);
            return true;
        } catch (error) {
            throw (error.error);
        }
    }


    async resendVerificationEmail(token) {
        try {
            let user = await userDAO.getUserByToken(token);
            await this.sendVerificationEmail(token, user.email);
            return true;
        } catch (error) {
            throw (error);
        }

    }


}

module.exports = UserController