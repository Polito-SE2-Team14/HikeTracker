const express = require('express');
const router = express.Router()
const isLoggedIn = router.get('isLoggedIn')
const userDAO = require('../DAO/UserDAO')
const { body, validationResult } = require('express-validator');


router.post('',
    body("name").not().isEmpty().trim().escape(),
    body("surname").not().isEmpty().trim().escape(),
    body('email').isEmail().normalizeEmail(),
    body("phoneNumber").not().isEmpty().trim().escape(),
    body("type").not().isEmpty().trim().escape().matches("(hiker|friend)"),
    body("password").not().isEmpty().trim().escape(),
    async (req, res) => {

        if (validationResult(req).isEmpty())
            return res.status(505).json(errors.array())

        await userDAO.Register(req.body.name, req.body.surname, req.body.email, req.body.phoneNumber, req.body.type, req.body.password)
            .then(() => res.status(201).end())
            .catch(err => {
                if (err === "user exists") res.status(422).send("User already exists")
                else res.status(505).send("error")
            })
    }
);
module.exports = router;
