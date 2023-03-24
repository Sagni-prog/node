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
     created_at: {
         type: Date,
         required: [true],
         default: Date.now()
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
     ]
},
  {
    toJSON: { virtual: true },
    toObject: { virtual: true }
  });

//   PostSchema.virtual('comments',{
//     ref: 'Comment',
//     foreignField: 'post',
//     localField: '_id'
// });

 PostSchema.pre('save',function(next){
     this.slug = slugify(this.title,{lower: true});
   
     next();
 }); 
//  PostSchema.pre('save',async function(next){
 
//    const user = await User.findById(req.body.auther);
//    this.author = user;
//      next();
//  }); 
 
const Post = mongoose.model("Post",PostSchema);

module.exports = Post;