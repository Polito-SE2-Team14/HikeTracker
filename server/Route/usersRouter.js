const express = require('express');
const router = express.Router()
const isLoggedIn = router.get('isLoggedIn')
const userDAO = require('../DAO/UserDAO')
const { body, validationResult } = require('express-validator');
const passport = require('passport');


router.post('',
    body("name").not().isEmpty().trim().escape(),
    body("surname").not().isEmpty().trim().escape(),
    body('email').isEmail().normalizeEmail(),
    body("phoneNumber").not().isEmpty().trim().escape(),
    body("type").not().isEmpty().trim().escape().matches("(hiker|friend)"),
    body("password").not().isEmpty().trim().escape(),
    async (req, res) => {
        if (!validationResult(req).isEmpty())
            res.status(422).end()//.json(errors.array());

        await userDAO.Register(req.body.name, req.body.surname, req.body.email, req.body.phoneNumber, req.body.type, req.body.password)
            .then(() => res.status(201).end())
            .catch(err => {
                if (err === "user exists") res.status(401).send("User already exists")
                else res.status(505).send("error")
            })
    }
);

router.post('/login', passport.authenticate('local'),
    async (req, res) => {
        res.status(201).json(req.user);
    }
);



router.get('/current',
    async (req, res) => {
        if (req.isAuthenticated()) {
            res.json(req.user);
        }
        else
            res.status(401).json({ error: 'Not authenticated' });
    }
);

router.delete('/current',
    async (req, res) => {
        req.logout(() => {
            res.end();
        });
    }
);


module.exports = router;
