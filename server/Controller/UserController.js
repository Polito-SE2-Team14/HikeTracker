const userDAO = require("../DAO/UserDAO")
const crypto = require("node:crypto");
const nodemailer = require("nodemailer");
const nodemailerConfig = require("../Config/nodemailer.config");
const { resolve } = require("node:path");


exports.login = async (email, password) => {
	const user = await userDAO.getUser(email, password)
		.catch(() => { throw Error(); });


	return user;
}

exports.getUser = async (userID) => {
	const user = await userDAO.getUserById(userID)
		.catch(() => { throw Error(); });
	return user;
}


exports.register = async (newUser, verified, approved) => {

	let { name, surname, email, phoneNumber, type } = newUser

	if (typeof name != "string")
		throw Error("Type error with name")
	if (typeof surname != "string")
		throw Error("Type error with surname")
	if (typeof email != "string")
		throw Error("Type error with email")
	if (isNaN(phoneNumber))
		throw Error("Type error with phoneNumber")
	if (typeof type != "string" || !["localGuide", "hiker", "hutWorker"].includes(type))
		throw Error("Type error with type")

	let token = crypto.randomBytes(20).toString('hex');
	const user = await userDAO.Register(newUser, token, verified, approved)
		.catch(err => { console.log(err); throw err });

	//EMAIL VERIFICATION
	if (verified !== 1 && approved !== 1)
		await this.sendVerificationEmail(user.token, user.email);

	return user;

}

//TODO test this function
exports.sendVerificationEmail = async (token, userEmail) => {
	//EMAIL VERIFICATION

	// let testAccount = await nodemailer.createTestAccount();

	// create reusable transporter object using the default SMTP transport
	const transporter = nodemailer.createTransport({
		service: "Gmail",
		secure: true,
		auth: {
			user: nodemailerConfig.user,
			pass: nodemailerConfig.pass
		}
	});

	// send mail with defined transport object
	let info = await transporter.sendMail({
		from: nodemailerConfig.user, // sender address
		to: userEmail, // list of receivers
		subject: "HIKEfive Verification Email", // Subject line
		html: "<p>You’ve received this message because your email address has been registered with our site. Please click the button below to verify your email address and confirm that you are the owner of this account.</p><p><a href='http://localhost:3000/user/verify/" + token + "'>Verify</a></p>", // html body
	});

	console.log("Message sent: %s", info.messageId);

	return true;

}

exports.verify = async (token) => {
	try {
		let user = await userDAO.getUserByToken(token);
		await userDAO.verifyUser(user.userID);
		return true;
	} catch (error) {
		console.error("Error in UserController", error.error)
		throw (error.error);
	}
}

exports.getAllLocalGuides = async (orderByUnapproved = false) => {
    try {
        let users = await userDAO.getUsersByType("localGuide", orderByUnapproved);
        return users;
    } catch (error) {
        console.error("Error in UserController", error)
        throw (error);
    }
}

exports.getAllHutWorkes = async (orderByUnapproved = false) => {
    try {
        let users = await userDAO.getUsersByType("hutWorker", orderByUnapproved);
        return users;
    } catch (error) {
        console.error("Error in UserController", error)
        throw (error);
    }
}

exports.approve = async (userID) => {
    try {
        let user = await userDAO.getUserById(userID);
        await userDAO.approveUser(user.userID);
        return true;
    } catch (error) {
        console.error("Error in UserController", error.error)
        throw (error.error);
    }
}

exports.unApprove = async (userID) => {
    try {
        let user = await userDAO.getUserById(userID);
        await userDAO.unApproveUser(user.userID);
        return true;
    } catch (error) {
        console.error("Error in UserController", error.error)
        throw (error.error);
    }
}

//TODO test this function
exports.resendVerificationEmail = async (token) => {
	try {
		let user = await userDAO.getUserByToken(token);
		await this.sendVerificationEmail(token, user.email);
		return true;
	} catch (error) {
		console.error("Error in UserController", error)
		throw (error);
	}
}

exports.updateUser=async(userID,info)=>{
	try{
		let user = await userDAO.updateUser(userID,info);
		return user;
	}catch(error){
		console.error(error);
		throw(error);
	}
}

exports.addUserStats=async(userStats)=>{
	try{
		let addedStats = await userDAO.addUserStats(userStats);
		return addedStats;
	}catch(error){
		console.error(error);
		throw(error);
	}
}

exports.getUserStats=async(userID)=>{
	try{
		let userStats=await userDAO.getUserStats(userID);
		return userStats;
	}catch(error){
		throw(error);
	}
}

exports.updateUserStats=async(userID)=>{
	try{
		let userStats=await userDAO.updateUserStats(userID);
		return userStats;
	}catch(error){
		throw(error);
	}
}