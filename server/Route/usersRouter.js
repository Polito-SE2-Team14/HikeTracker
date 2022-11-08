const express = require('express');
const router = express.Router()
const prefixRoute = '/api/';
const isLoggedIn = router.get('isLoggedIn')
const userDAO = require('../DAO/UserDAO')


module.exports = router;
