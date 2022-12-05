const express = require('express');
const router = express.Router()
const { check, validationResult, param } = require('express-validator');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const userController = require("../Controller/UserController")
const { errorResponse } = require("./utils")

passport.use(new LocalStrategy(async function verify(username, password, cb) {


    if (String(password).length <= 6) {
        return cb("Invalid password (less than 6 chars)")
    }

    const user = await userController.login(username, password)
        .catch(() => { return errorResponse("unprocessable entity", 422, res) });

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
    check(["name", "surname", "password"]).not().isEmpty().trim().escape(),
    check('email').isEmail().normalizeEmail(),
    check("phoneNumber").not().isEmpty().isInt(),
    check("type").not().isEmpty().trim().escape().matches("(hiker|localGuide|hutWorker)"),
    async (req, res) => {

        if (!validationResult(req).isEmpty())

            await userController.register(req.body, 0, 0)
                .then(() => res.status(201).end())
                .catch(err => {
                    if (err === "user exists")
                        return errorResponse("user already exists", 422, res)
                    else errorResponse(err, 505, res)
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

router.post('/send-verification/:token',
    param("token").not().isEmpty().trim().escape(),
    async (req, res) => {
        if (!validationResult(req).isEmpty())
            return res.status(422).end()

        await userController.resendVerificationEmail(req.params.token)
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
