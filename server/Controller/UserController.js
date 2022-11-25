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

    async register(newUser) {

        let token = crypto.randomBytes(20).toString('hex');
        const user = await userDAO.Register(newUser, token)
            .catch(err => { throw Error(err) });

        //EMAIL VERIFICATION

        // let testAccount = await nodemailer.createTestAccount();

        // create reusable transporter object using the default SMTP transport
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'zoey.kassulke86@ethereal.email',
                pass: 'fVdChxSRdWaH3kfKdb'
            }
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"HIKEfive" <support@hikefive.com>', // sender address
            to: user.email, // list of receivers
            subject: "HIKEfive | Verify Email", // Subject line
            html: "<p>You’ve received this message because your email address has been registered with our site. Please click the button below to verify your email address and confirm that you are the owner of this account.</p><p><a href='http://localhost:3000/user/verify/" + user.token + "'>Verify</a></p>", // html body
        });

        console.log("Message sent: %s", info.messageId);

        return user;

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


}

module.exports = UserController