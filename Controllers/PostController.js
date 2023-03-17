const { findByIdAndUpdate } = require('./../Models/Post');
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
  
   exports.update = async(req,res) => {
   
   try {
    
   
      const posts = await Post.findByIdAndUpdate(
                req.params.id,
              { "title": req.body.title },
              {
               new: true,
               runValidators: true
      });
   
   res.status(200).json({
         status: "success",
         data: {
               posts
         }
   });
   } catch (error) {
       res.status(400).json({
            status: "fail",
            message: error
       });
   }     
}
   