const { findByIdAndUpdate } = require('./../Models/Post');
const Post = require('./../Models/Post'); 
const AppError = require('./../utils/appError');


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

 exports.getPost = async(req,res,next) => {
 
 try {
       const id = req.params.id;
       const post = await Post.findById(id);
       
       if(!post){
          return next(new AppError('No Post found with this I',404));
       }
       
       res.status(200).json({
           status: "success",
           data: {
              post
           }
       });
 } catch (error) {
   return next(new AppError('No Post found with this I',404));
   }
    
 }
  
   exports.update = async(req,res) => {
   
   try {
    
      const posts = await Post.findByIdAndUpdate(
                req.params.id,
                req.body,
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


exports.destroy = async(req,res) => {
   
   try {
        const posts = await Post.findByIdAndDelete(req.params.id);
          
        res.status(204).json({
            status: "success",
            data: {
               posts
            }
        });
   } catch (error) {
         res.status(404).json({
            status: "fail",
            message: error
         })
     } 
  }
   