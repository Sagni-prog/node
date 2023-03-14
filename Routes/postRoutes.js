const express = require('express');
const fs = require('fs');
const PostController = require('./../Controllers/PostController');



const router = express.Router();

router.param('id',PostController.checkId);


// middleware that validates fields
const checkBody = (req,res,next) => {
   if(req.method === 'POST'){
       if(!req.body.title || !req.body.body || req.body.photo_url){
           return res.status(400).json({
               status : 'fail',
               message: 'fields cant be null'
           });
       }
       
       console.log('working...');
    
   }
   
   next();
}

router
    .route('/')
    .get(PostController.getAllPosts)
    .post(checkBody,PostController.addPost);

router
    .route('/:id')
    .get(PostController.getPostById)
    .patch(PostController.updatePost);
    
module.exports = router; 