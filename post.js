const express = require('express');
const fs = require('fs');
const morgan = require('morgan');

const app = new express();
app.use(express.json());
app.use(morgan('dev'));

app.use((req,res,next) => {
   console.log("middleware");
   next();
});



const posts = JSON.parse(fs.readFileSync(`${__dirname}/data/posts.json`,'utf-8'));

const getAllPosts = (req,res) => {

    res.status(200).json({
          status: "success",
          results: posts.length,
          data: {
                  posts 
           }
    });
}

const addPost = (req,res) => {
     
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

const getPostById = (req,res) => {
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
  
  const updatePost = (req,res) => {

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


app.get('/api/v1/posts',getAllPosts);
app.post('/api/v1/posts',addPost);
app.get('/api/v1/posts/:id',getPostById);
app.patch('/api/v1/posts/:id',updatePost);



const port = 4000;
app.listen(port,() => {
     console.log("app running on port 4000");
});