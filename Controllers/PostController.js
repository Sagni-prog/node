const Post = require('./../Models/Post'); 


  exports.create = async (req,res) => {
  
  try {
   
         const post = await Post.create({
            title : req.body.title,
            post_body: req.body.post_body,   
       });
       
       res.status(201).json({
          status: "success",
          data: {
             post
          }
       });
  } catch (error) {
        res.status(400).json({
           status: "fail",
           message: err
        });
      }       
  }

    exports.index = async (req,res) => {
    
    try {
         const posts = await Post.find();
         
         res.status(200).json({
               status: "success",
               results: posts.length,
               data: {
                       posts 
                }
         });
    } catch (error) {
        res.status(400).json({
           status: "fail",
           message: err
        });
    }
}

 exports.getPost = async(req,res) => {
 
 try {
       const id = req.params.id;
       const post = await Post.findById(id);
       
       res.status(200).json({
           status: "success",
           data: {
              post
           }
       });
 } catch (error) {
       res.status(400).json({
            status: "fail",
            message: error
       });
   }
    
 }
 exports.getPostById = (req,res) => {
    const id = req.params.id * 1;
    
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
         
         fs.writeFile(`${__dirname}/learn/data/posts.json`,JSON.stringify(newPosts),err => {
            res.status(201).json({
            status: "success", 
            data: {
               newPosts
            }
            });
        });
        
    }
  