const express = require('express');
const UserController = require('./../Controllers/UserController');

const router = express.Router();

router.get('/',UserController.getAllUsers);

module.exports = router;