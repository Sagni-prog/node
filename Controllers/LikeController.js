const Like = require('./../Models/Like');
const Post = require('./../Models/Post');
const AppError = require('./../utils/appError');

const likeIt = async (id) =>{
         const like = await Like.findById(id);
            like.isLiked = !like.isLiked;
           await like.save();
}

const createLike = async (post,user) => {
    const like = await Like.create({
        isLiked: true,
        liker: user,
        post: post
   });
   
   post.likes[post.likes.length] = like._id;
   await post.save();
    return true;
}

exports.postLike = async (req,res,next) => {
    try {
        const post = await Post.findById(req.params.postId).populate('likes');
        
        if(!post){
           return next(
                 new AppError('post with this Id does not exist',404)
           );
        }
        
        if(!post.likes.length) {
         
            await createLike(post,req.user);
        }
        
  
      post.likes.map((like) => {
         let index = 0; 
         index = index + 1;
            if(like.liker._id.equals(req.user._id)){
            
                likeIt(like._id);
                
            } 
            if(post.likes.length === index + 1){
                createLike(post,req.user);
                
                res.json({
                   index: index,
                   len: post.likes.length,
                   data: {
                   post
                   }
                })
                // console.log("end of the array")
            }
            
            res.status(201).json({
               status: 'sucess',
               data: {
               post
               }
            })
        });
    
    } catch (error) {
        next(error)
    }
}

exports.replayLike = async (req,res,next) => {

}

exports.commentLike = async (req,res,next) => {

}

