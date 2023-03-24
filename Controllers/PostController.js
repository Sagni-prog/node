const { findByIdAndUpdate } = require('./../Models/Post');
const Post = require('./../Models/Post'); 
const User = require('./../Models/User'); 
const AppError = require('./../utils/appError');
const FieldFilter = require('./../utils/FieldFilters');


const catchAsync = fn => {
    return (req,res,next) => {
      fn(req,res,next).catch(next)
    }
}
  exports.create = async (req,res) => {
  
  try {
  

     const fields = FieldFilter.postFilter(req.body,'title','post_body','post_photo');
     let newObj = fields;
     newObj = {...newObj, author: req.user}
         console.log("new ",newObj)
         
         const post = await Post.create(newObj);
      
       
       res.status(201).json({
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
          return  next(new AppError('No Post found with this I',404));
       }
       
       res.status(200).json({
           status: "success",
           data: {
              post
           }
       });
      
 } catch (error) {
    
     next(error)
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
      
      posts.postUpdatedAt();
   
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
        
        posts.postDeletedAt();
          
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
   