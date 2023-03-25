const Like = require('./../Models/Like');
const Post = require('./../Models/Post');
const AppError = require('./../utils/appError');

exports.postLike = async (req,res,next) => {
    try {
        const post = await Post.findById(req.params.postId).populate('comments');
        if(!post){
           return next(
                 new AppError('post with this Id does not exist',404)
           );
        }
        
        if(post.likes.length) {
           const like = await Like.create({
                isLiked: true,
                liker: req.user,
                post: post
           });
           
           post.likes[post.likes.length] = like._id;
           post.save();
        }
      
    
        post.likes.map((like) => {
            if(like.author._id.equals(req.user._id)){
                like.isLiked = !like.isLiked;
                post.save();
            }
        });
    
        
        // if(post.likes.author._id.equals(req.user._id)){
        
        // }
        
    } catch (error) {
        next(error)
    }
}

exports.replayLike = async (req,res,next) => {

}

exports.commentLike = async (req,res,next) => {

}

