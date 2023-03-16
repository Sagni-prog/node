const express = require('express');
const PostController = require('./../Controllers/PostController');

const router = express.Router();

router.get('/',PostController.getAllPosts);
router.get('/:id',PostController.getPostById);

module.exports = router;