const express = require('express');
const userController = require('./../Controllers/UserController');


const router = express.Router();

router
    .route('/')
    .get(userController.getAllUsers);
    
module.exports = router;    

