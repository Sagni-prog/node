const express = require('express');
const AuthController = require('./../Controllers/AuthController');

const router = express.Router();

router.get('/',AuthController.protect,AuthController.authorize('admin'),AuthController.index);
router.post('/signup',AuthController.signup);
router.post('/login',AuthController.login);
router.post('/forgetpassword',AuthController.forgetPassword);

module.exports = router;