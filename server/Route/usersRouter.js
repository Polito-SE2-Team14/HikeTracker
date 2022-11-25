const express = require('express');
const router = express.Router()
const { body, validationResult, param } = require('express-validator');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const UserController = require("../Controller/UserController")
const userController = new UserController()


passport.use(new LocalStrategy(async function verify(username, password, cb) {

    /* if (!validateEmail(username)) {
        return cb("Invalid Email")
    }

    if (String(password).length <= 6) {
        return cb("Invalid password")
    } */

    const user = await userController.login(username, password)
        .catch(() => { return res.status(422).send("Unprocessable entity") });

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

router.post('',
    body(["name", "surname", "password"]).not().isEmpty().trim().escape(),
    body('email').isEmail().normalizeEmail(),
    body("phoneNumber").not().isEmpty().isInt(),
    body("type").not().isEmpty().trim().escape().matches("(hiker|localGuide|hutWorker)"),
    async (req, res) => {
        if (!validationResult(req).isEmpty())
            return res.status(422).end()

        await userController.register(req.body)
            .then(() => res.status(201).end())
            .catch(err => {
                console.error(err)

                if (err === "user exists")
                    return res.status(401).send("User already exists")
                else res.status(505).send("error")
            })



    }
);

router.put('/verify/:token',
    param("token").not().isEmpty().trim().escape(),
    async (req, res) => {
        if (!validationResult(req).isEmpty())
            return res.status(422).end()

        await userController.verify(req.params.token)
            .then(() => res.status(201).end())
            .catch(err => {
                if (err === "Token is wrong")
                    return res.status(401).send({ "error": "Token is wrong" })
                else res.status(505).send(err)
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
