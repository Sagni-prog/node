const express = require('express');
const AuthController = require('./../Controllers/AuthController');
const Auth = require('./../middlewares/Auth');

const router = express.Router();

    router.get('/',Auth,AuthController.authorize('admin'),AuthController.index);
    router.post('/signup',AuthController.signup);
    router.post('/login',AuthController.login);
    router.post('/forget-password',AuthController.forgetPassword);
    router.patch('/reset-password/:token',AuthController.resetPassword);
    router.patch('/update-password',Auth,AuthController.updatePassword); 
    router.patch('/update',Auth,AuthController.udateUser);
    router.delete('/delete',Auth,AuthController.deleteUser);



module.exports = router;