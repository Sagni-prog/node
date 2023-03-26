const Like = require('./../Models/Like');
const Post = require('./../Models/Post');
const AppError = require('./../utils/appError');

const likeIt = async (id) =>{
         const like = await Like.findById(id);
            like.isLiked = !like.isLiked;
           await like.save();
           
           return like;
}

const createLike = async (post,user) => {
    const like = await Like.create({
        isLiked: true,
        liker: user,
        post: post
   });
   
   post.likes[post.likes.length] = like._id;
   await post.save();
    return post;
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
         
            const post = createLike(post,req.user);
            console.log("from first like: ",post)
            
            res.json({
               post
            })
        }
        
  
    //    const len = post.likes.length;
    //    for(let i = 0; i < len; i++){
    //       if(post.likes[i].liker._id.equals(req.user._id)){
    //            const like =  likeIt(post.likes[i]._id);
               
    //            console.log("from second like: ",like)
               
    //            res.json({
    //               like
    //            })
              
    //       }else if(i === len){
    //           const post = createLike(post,req.user); 
    //           console.log("from third like: ",post)
    //           res.json({
    //              post
    //          })
    //       }
    //    }
    
      post.likes.forEach(el => {
          if(el.liker._id.equals(req.user._id)){
          
                const likes = likeIt(el._id);
                   
                res.json({
                   likes
                })
          }
      });
   
    //   post.likes.map((like) => {
    //         if(like.liker._id.equals(req.user._id)){
            
    //            const likes = likeIt(like._id);
               
    //            res.json({
    //               likes
    //            })
                
    //         } 
    //         // if( post.likes.length === 2){
    //         //    const posts = createLike(post,req.user);
                
    //         //     res.json({
    //         //        data: {
    //         //        posts
    //         //        }
    //         //     })
    //         // }
            
    //         res.status(201).json({
    //            status: 'fail'
    //         })
    //     });
    
    } catch (error) {
        next(error)
    }
}

exports.replayLike = async (req,res,next) => {

}

exports.commentLike = async (req,res,next) => {

}

