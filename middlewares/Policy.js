const Post = require('./../Models/Post');
const Comment = require('./../Models/Comment');
const AppError = require('./../utils/appError');

exports.postPolicy =  async(req,res,next) => {

    try {
       
       const post = await Post.findById(req.params.id);
    
       if(!req.user._id.equals(post.author._id)){
           return next(
                   new AppError('you cant delete others post',401)
           )
       }
        next();
       
       
    } catch (error) {
        next(error);
      } 
    }
    
exports.commentPolicy =  async(req,res,next) => {

    try {
       
       const comment = await Comment.findById(req.params.id);
    
       if(!req.user._id.equals(comment.author._id)){
           return next(
                   new AppError('you cant delete others post',401)
           )
       }
        next(); 
       
    } catch (error) {
        next(error);
      } 
    }
