const express = require('express');
const AuthController = require('./../Controllers/AuthController');

const router = express.Router();

router.get('/',AuthController.protect,AuthController.index);
router.post('/signup',AuthController.signup);
router.post('/login',AuthController.login);

module.exports = router;