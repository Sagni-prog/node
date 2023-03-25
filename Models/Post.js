const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');
const User = require('./User');

const PostSchema = mongoose.Schema({

     title: {
      type: String,
      required: [true,"Title is required"]
     },
     post_body: {
         type: String,
         required: [true,"Post Body is required"]
     },
     slug: {
         type: String
     },
     post_photo: [
        {   
            photo_name: {
               type: String
            },
            photo_path: {
               type: String
            },
            photo_url: {
              type: String
            },
            photo_width: {
               type: Number
            },
            photo_height: {
               type: Number
            }
        }
     ], 
     author: Object,
     comments: [
        {
             type: mongoose.Schema.ObjectId,
             ref: 'Comment'
        }
     ],
     likes: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Like'
        }
     ], 
     
     created_at: {
            type: Date,
            required: [true],
            default: Date.now()
  },
  updatad_at: Date,
  deleted_at: Date
});
  
//   PostSchema.virtual('comments', {
//    ref: 'Comment', 
//    localField: '_id', 
//    foreignField: 'post', 
// });

// Set Object and Json property to true. Default is set to false
// PostSchema.set('toObject', { virtuals: true });
// PostSchema.set('toJSON', { virtuals: true });

//   PostSchema.virtual('comments',{
//     ref: 'Comment',
//     foreignField: 'post',
//     localField: '_id'
// });

 PostSchema.pre('save',function(next){
     this.slug = slugify(this.title,{lower: true});
   
     next();
 }); 
 
 PostSchema.methods.postUpdatedAt = function(){
    this.updatad_at = Date.now();
 }
 
 PostSchema.methods.postDeletedAt = function(){
    this.deleted_at = Date.now();
 }
//  PostSchema.pre('save',async function(next){
 
//    const user = await User.findById(req.body.auther);
//    this.author = user;
//      next();
//  }); 
 
const Post = mongoose.model("Post",PostSchema);

module.exports = Post;