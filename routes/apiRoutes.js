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

module.exports = router;