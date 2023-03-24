const AppError = require('../utils/appError');
const Comment = require('./../Models/Comment');
const Post = require('./../Models/Post');


exports.isUserOwnsTheComment = async (req,res,next) => {

try {
   const comment = await Comment.findOne(req.params.id);
   if(!req.user._id !== comment.author){
       return next(
               new AppError('you cant delete others post',401)
       )
   }
   await next();
   
} catch (error) {
    next(error);
  } 
}
exports.index = async (req,res,next) => {

// const posts = await Post.find().populate('comments');
try {
   const comments = await Comment.find().populate({
      path: 'post',
      select: 'title post_body'
   }).populate({
      path: 'author'
   });
   
   res.status(200).json({
       status: 'sucess',
       data: {
          comments
       }
   })
} catch (error) {
    next(error);
  }  
}

exports.create = async (req,res,next) => {
   try {
      const post = await Post.findById(req.body.post);
      
      if(!post){
          return next(
                new AppError('Comment without post is impossible',404)
          );
      }
      const comment = await Comment.create(req.body);
      post.comments[post.comments.length] = comment._id;
      post.save();
      
      res.status(201).json({
         status: 'sucess',
         data: {
            comment
         }
      });
   } catch (error) {
         res.status(400).json({
             status: 'fail',
             message: error
         });
   }  
}

exports.update = async (req,res,next) => {
   try {
       const comment = await Comment.findByIdAndUpdate(req.params.id,req.body,{
          new: true,
          runValidators: true
       });
       
      comment.commentUpdatedAt();
       
       res.status(200).json({
           statud: 'secess',
           data: {
              comment     
           }
       })
   } catch (error) {
      next(error);
   }
}

exports.delete = async (req,res,next) => {
   try {
       const comment = await Comment.findById(req.params.id);
       if(!comment){
           return next(new AppError('Comment with this Id not found',404));
       }
       comment.commentDeletedAt();
       
       res.status(200).json({
          status: 'sucess',
          data: {
             comment
          }
       })
   } catch (error) {
      next(error);
   }
}