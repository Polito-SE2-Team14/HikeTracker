'use strict'

//import
const express = require('express');
const morgan = require('morgan')
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const dayjs = require('dayjs')
const { body, check, validationResult } = require('express-validator');
const hike_dao = require('./DAO/hikeDAO.');
const { download } = require('server/reply');


// init express
const app = new express();
const port = 3001;

app.use(express.json());
app.use(morgan('dev'));

// set up and enable cors
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};
app.use(cors(corsOptions));



// Passport: set-up the local strategy
passport.use(new LocalStrategy(async function verify(username, password, cb) {

  if (!validateEmail(username)) {
	return cb("Invalid Email")
  }

  if (String(password).length <= 6) {
	return cb("Invalid password")
  }

  const user = null
  if (!user)
	return cb(null, false);
  return cb(null, user);
}));

passport.serializeUser(function (user, cb) {
  cb(null, user);
})

passport.deserializeUser(function (user, cb) {
  return cb(null, user);
})

app.use(session({
  secret: 'secret string',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.authenticate('session'));

const prefixRoute = '/api/';

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
	return next();
  }
  return res.status(401).json({ error: 'Not authorized' });
}

// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

// hike calls
app.get('/api/hikes',async(req,res)=>{
	hike_dao.listAllHikes()
		.then(hikes=>res.json(hikes))
		.catch(()=>res.status(500).end());
});

app.post('/api/hikes', isLoggedIn, async(req,res)=>{
	try{
		if (!check_hike(req.body.hike)){
			res.status(404).json({error:`Invalid fields in the inserted hike`});
			return;
	}
	await hike_dao.addHike(req.body.hike);
	}catch(err){
		res.status(503).json({error:`Database error during the adding of hike ${req.body.hike.hikeID} in the database`});
	}
});

app.put('api/hikes/', isLoggedIn, async(req,res)=>{
	try{
		await hike_dao.updateHike(req.body.hike);
	}catch(err){
		res.status(404).json({error:"Hike not found"})
	}
});