'use strict'

//import
const express = require('express');
const morgan = require('morgan')
const session = require('express-session');
const cors = require('cors');

// Passport-related imports
const passport = require('passport');
const LocalStrategy = require('passport-local');


// init express
const prefixRoute = '/api/';
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

app.use(session({
  secret: "shhhhh... it's a secret!",
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.authenticate('session'));


//PASSPORT CONF
const userDAO = require('./DAO/UserDAO');
passport.use(new LocalStrategy(async function verify(username, password, cb) {
  const user = await userDAO.getUser(username, password)
  if (!user)
    return cb(null, false, 'Incorrect username or password.');

  return cb(null, user);
}));

passport.serializeUser(function (user, cb) {
  cb(null, user);
});


// ################################# Hike APIs ##########################################
const hikesRouter = require("./Route/hikesRouter");
app.use(prefixRoute + 'hikes', hikesRouter);
// ################################# Point APIs ##########################################
const pointsRouter = require("./Route/pointsRouter");
app.use(prefixRoute + 'points', pointsRouter);
// ################################# User APIs ##########################################
const usersRouter = require("./Route/usersRouter");
app.use(prefixRoute + 'users', usersRouter);
// ################################# Parking lot APIs ####################################
const pLotRouter = require("./Route/parkingLotRouter");
app.use(prefixRoute + 'parkinglots', pLotRouter);
// ################################# Huts APIs ##########################################
const hutsRouter = require("./Route/hutsRouter");
app.use(prefixRoute + 'huts', hutsRouter);
// ################################# HikeRecords APIs ##########################################
const hikeRecordsRouter = require("./Route/hikeRecordsRouter");
app.use(prefixRoute + 'hikeRecords', hikeRecordsRouter);

// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

module.exports = app;