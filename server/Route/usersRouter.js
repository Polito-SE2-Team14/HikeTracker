const express = require('express');
const router = express.Router()
const prefixRoute = '/api/';
const isLoggedIn = router.get('isLoggedIn')
const userDAO = require('../DAO/UserDAO')

router.post(prefixRoute + 'users', async (req, res) => {

    const name = req.body.name;
    const surname = req.body.surname;
    const email = req.body.email;
    const phoneNumber = req.body.phoneNumber;
    const type = req.body.type;
    const password = req.body.password;

    console.log(name,surname, email, phoneNumber, type, password)

    await userDAO.Register(name, surname, email, phoneNumber, type, password)
        .then(() => res.status(201).end())
        .catch(err => res.status(505).send("error"))
});
module.exports = router;
