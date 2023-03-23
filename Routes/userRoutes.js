const express = require('express');
const AuthController = require('./../Controllers/AuthController');

const router = express.Router();

    router.get('/',AuthController.protect,AuthController.authorize('admin'),AuthController.index);
    router.post('/signup',AuthController.signup);
    router.post('/login',AuthController.login);
    router.post('/forget-password',AuthController.forgetPassword);
    router.patch('/reset-password/:token',AuthController.resetPassword);
    router.patch('/update-password',AuthController.protect,AuthController.updatePassword); router.patch('/update',AuthController.protect,AuthController.udateUser);
    router.delete('/delete',AuthController.protect,AuthController.deleteUser);



module.exports = router;