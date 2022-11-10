const express = require('express');
const router = express.Router()
const prefixRoute = '/api/';
const isLoggedIn = router.get('isLoggedIn')
const userDAO = require('../DAO/UserDAO')
const { body, validationResult } = require('express-validator');

const Controller = require('../Controller/Controller')
const Singleton = require('../Controller/ControllerSingleton')
const controller = Singleton.getInstance();

router.post(prefixRoute + 'users',
    body("name").not().isEmpty().trim().escape(),
    body("surname").not().isEmpty().trim().escape(),
    body('email').isEmail().normalizeEmail(),
    body("phoneNumber").not().isEmpty().trim().escape(),
    body("type").not().isEmpty().trim().escape(),
    body("password").not().isEmpty().trim().escape(),
    async (req, res) => {

        if (validationResult(req).isEmpty() && (req.body.type === "hiker" || req.body.type === "friend")) {
            await userDAO.Register(req.body.name, req.body.surname, req.body.email, req.body.phoneNumber, req.body.type, req.body.password)
                .then(() => res.status(201).end())
                .catch(err => res.status(505).send("error"))
        }
        else return res.status(505).json(errors.array())
    });
module.exports = router;
