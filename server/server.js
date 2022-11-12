'use strict'

//import
const express = require('express');
const morgan = require('morgan')
const session = require('express-session');
const cors = require('cors');
const dayjs = require('dayjs')
const { body, check, validationResult } = require('express-validator');
const { download } = require('server/reply');


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


// ################################# Hike APIs ##########################################
const hikesRouter = require("./Route/hikesRouter");
app.use(prefixRoute + 'hikes', hikesRouter);
// ################################# Point APIs ##########################################
const pointsRouter = require("./Route/pointsRouter");
app.use(prefixRoute + 'points', pointsRouter);
// ################################# User APIs ##########################################
const usersRouter = require("./Route/usersRouter");
app.use(prefixRoute + 'users', usersRouter);


// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

module.exports = app;