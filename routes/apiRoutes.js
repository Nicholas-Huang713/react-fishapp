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

//GET LOGGED IN USER
router.get('/getuser', verifyToken, (req, res) => {
    const decodedId = jwt.verify(req.token,  process.env.TOKEN_SECRET);
    console.log("User ID: " + JSON.stringify(decodedId));
    db.User.findOne({
        where: {
            id: decodedId._id
        }
    })
    .then(user => {
        console.log(user);
        res.send(user);
    })
    .catch((err) => res.send(err))
})

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
    .then((user) => {
        console.log("User: " + JSON.stringify(user.id));
        const token = jwt.sign({_id: user.id}, process.env.TOKEN_SECRET, { expiresIn: '1h' });
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
    const token = jwt.sign({_id: user.id}, process.env.TOKEN_SECRET, { expiresIn: '1h' });
    res.header('auth-token', token).send(token);
})

//UPDATE USER PROFILE
router.put('/editprofile', verifyToken, (req, res) => {
    const decodedId = jwt.verify(req.token,  process.env.TOKEN_SECRET);
    db.User.update({
        firstname: req.body.firstName,
        lastname: req.body.lastName,
        email: req.body.email
    }, {where: {id: decodedId._id}})
    .then(() => {
        console.log("Updated profile")
    })
    .catch((err) => res.send(err))
});

function verifyToken(req, res, next){
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}

module.exports = router;