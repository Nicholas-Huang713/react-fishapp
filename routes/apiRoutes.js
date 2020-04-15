const express = require('express');
const router = express.Router();
const db = require('../models');
const {registerValidation, loginValidation} = require('../validation');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

//GET ALL USERS
router.get('/all', (req, res) => {
    db.User.findAll().then(Users => res.send(Users));
});

//REGISTER NEW USER
router.post('/register', async (req, res) => {
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).json(error.details[0].message);
    const emailExist = await db.User.findOne({where: {email: req.body.email}});
    if(emailExist) return res.status(400).json('Email already exists');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    db.User.create({
        firstname: req.body.firstName,
        lastname: req.body.lastName,
        email: req.body.email,
        password: hashedPassword
    })
    .then((data) => {
        const user = data;
        console.log("User: " + JSON.stringify(user.id));
        const token = jwt.sign({id: user.id}, process.env.TOKEN_SECRET, { expiresIn: '1h' });
        res.header('auth-token', token).send(token);
    })
    .catch((err) => res.send(err))
});

//LOGIN USER
router.post('/login', async (req, res) => {
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const user = await db.User.findOne({where: {email: req.body.email}});
    if(!user) return res.status(400).send('Email does not exist');
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Invalid password');
    const token = jwt.sign({id: user.id}, process.env.TOKEN_SECRET, { expiresIn: '1h' });
    res.header('auth-token', token).send(token);
})

module.exports = router;