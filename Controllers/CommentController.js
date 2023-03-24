const Comment = require('./../Models/Comment');
const Post = require('./../Models/Post');

exports.index = async (req,res,next) => {

// const posts = await Post.find().populate('comments');
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
}

exports.create = async (req,res,next) => {
   const comment = await Comment.create(req.body);
   const post = await Post.findById(req.body.post);
   post.comments[post.comments.length] = comment._id;
   post.save();
   
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