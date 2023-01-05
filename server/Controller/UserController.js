const userDAO = require("../DAO/UserDAO")
const crypto = require("node:crypto");
const nodemailer = require("nodemailer");
const nodemailerConfig = require("../Config/nodemailer.config");


exports.login = async (email, password) => {
	const user = await userDAO.getUser(email, password)

	return user;
}

exports.getUser = async (userID) => {
	const user = await userDAO.getUserById(userID)

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
	if (type === 'hiker') {
		approved = true;
	}
	const user = await userDAO.Register(newUser, token, verified, approved)
		.catch(err => { throw err });


	//EMAIL VERIFICATION
	if (verified !== 1 && approved !== 1)
		await this.sendVerificationEmail(user.token, user.email);

	return user;

}

exports.sendVerificationEmail = async (token, userEmail) => {
	//EMAIL VERIFICATION

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
	await transporter.sendMail({
		from: nodemailerConfig.user, // sender address
		to: userEmail, // list of receivers
		subject: "HIKEfive Verification Email", // Subject line
		html: "<p>You’ve received this message because your email address has been registered with our site. Please click the button below to verify your email address and confirm that you are the owner of this account.</p><p><a href='http://localhost:3000/user/verify/" + token + "'>Verify</a></p>", // html body
	});

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

exports.updateUser = async (userID, info) => {
	try {
		let user = await userDAO.updateUser(userID, info);
		return user;
	} catch (error) {
		console.error(error);
		throw (error);
	}
}

const isNullOrWrongType = (value, type) => {
	return (value == null || typeof value !== type)
}

exports.addUserStats = async (userStats) => {

	if (Number.isNaN(userStats.userID)) {
		console.error("Invalid userID")
		throw Error("Invalid userID")
	}
	if (isNullOrWrongType(userStats.completedHikes, "number")) {
		console.error("Invalid completedHikes")
		throw Error("Invalid completedHikes")
	}
	if (isNullOrWrongType(userStats.minTime, "number")) {
		console.error("Invalid minTime")
		throw Error("Invalid minTime")
	}
	if (isNullOrWrongType(userStats.maxTime, "number")) {
		console.error("Invalid maxTime")
		throw Error("Invalid maxTime")
	}
	if (isNullOrWrongType(userStats.minDistance, "number")) {
		console.error("Invalid minDistance")
		throw Error("Invalid minDistance")
	}
	if (isNullOrWrongType(userStats.maxDistance, "number")) {
		console.error("Invalid maxDistance")
		throw Error("Invalid maxDistance")
	}
	if (isNullOrWrongType(userStats.minAscent, "number")) {
		console.error("Invalid minAscent")
		throw Error("Invalid minAscent")
	}
	if (isNullOrWrongType(userStats.maxAscent, "number")) {
		console.error("Invalid maxAscent")
		throw Error("Invalid maxAscent")
	}

	let addedStats
	await userDAO.addUserStats(userStats)
		.then(stats => addedStats = stats)

	return addedStats;

}

exports.getUserStats = async (userID) => {
	let userStats
	await userDAO.getUserStats(userID)
		.then(us => userStats = us)

	return userStats;
}

exports.updateUserStats = async (userID, userStats) => {

	await userDAO.updateUserStats(userID, userStats)

	return userStats;
}