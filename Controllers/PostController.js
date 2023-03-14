const express = require('express');
const fs = require('fs');

const posts = JSON.parse(fs.readFileSync(`${__dirname}/../data/posts.json`,'utf-8'));

// middleware that check valid id

exports.checkId = (req,res,next,val) => {
    if(req.params.id * 1 > posts.length){
    
    console.log("Post id: ",val);
       return res.status(404).json({
          status: 'fail',
          message: 'Invalid Id'
       });
       
    }
    
    next();
}
   
    exports.getAllPosts = (req,res) => {

    res.status(200).json({
          status: "success",
          results: posts.length,
          data: {
                  posts 
           }
    });
}

  exports.addPost = (req,res) => {
     
    const data = req.body;
    const newId = posts[posts.length - 1].post_id + 1;
    const newPost = Object.assign({post_id: newId, }, data);
    
   posts.push(newPost);
   
   fs.writeFile(`${__dirname}/data/posts.json`,JSON.stringify(posts),err => {
       res.status(201).json({
       status: "success", 
       data: {
          newPost
       }
       });
   });
   
}
 
 exports.getPostById = (req,res) => {
    const id = req.params.id * 1;
    const post = posts.find(el => el.post_id === id); 
    
      if(!post){
         return res.status(404).json({
              status: "fail", 
              message: "not found", 
           }); 
      }
    res.status(200).json({
       status: "success", 
       data: {
          post
       }
       
    }); 
  }
  
   exports.updatePost = (req,res) => {

    const id = req.params.id * 1;
    const newPost = req.body;
         const post = posts.find(el => el.post_id === id);
         const firstSlice = posts.slice(0,id - 1);
         const secondSlice = posts.slice(id,posts.length);
         
         const updatedPost = Object.assign({post_id: id, },  newPost);
         
         const newPosts = [
              firstSlice,
              updatedPost,
              secondSlice
         ];
         
         fs.writeFile(`${__dirname}/data/posts.json`,JSON.stringify(newPosts),err => {
            res.status(201).json({
            status: "success", 
            data: {
               newPosts
            }
            });
        });
        
    }
  