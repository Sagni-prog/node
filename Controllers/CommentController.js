const AppError = require('../utils/appError');
const Comment = require('./../Models/Comment');
const Post = require('./../Models/Post');

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

}

exports.delete = async (req,res,next) => {

}