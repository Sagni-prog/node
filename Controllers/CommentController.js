const Comment = require('./../Models/Comment');
const Post = require('./../Models/Post');

exports.index = async (req,res,next) => {

const posts = await Post.find().populate('comments');
    // const comments = await Comment.find().populate({
    //    path: 'post'
    // }).populate({
    //    path: 'author'
    // });
    
    res.status(200).json({
        status: 'sucess',
        data: {
           posts
        }
    })
}

exports.create = async (req,res,next) => {
   const comment = await Comment.create(req.body);
   
   res.status(201).json({
      status: 'sucess',
      data: {
         comment
      }
   });
}

exports.update = async (req,res,next) => {

}

exports.delete = async (req,res,next) => {

}