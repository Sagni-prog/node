const express = require('express');
const AuthController = require('./../Controllers/AuthController');

const router = express.Router();

router.post('/signup',AuthController.signup);

module.exports = router;