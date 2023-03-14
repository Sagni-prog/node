const express = require('express');
const fs = require('fs');
const PostController = require('./../Controllers/PostController');



const router = express.Router();

router.param('id',PostController.checkId);

router
    .route('/')
    .get(PostController.getAllPosts)
    .post(PostController.addPost);

router
    .route('/:id')
    .get(PostController.getPostById)
    .patch(PostController.updatePost);
    
module.exports = router; 