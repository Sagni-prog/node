const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');

const PostSchema = mongoose.Schema({

     title: {
      type: String,
      required: [true,"Title is required"],
      // validate: validator.isAlpha
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
});

 PostSchema.pre('save',function(next){
     this.slug = slugify(this.title,{lower: true});
   
     next();
 }); 
 

const Post = mongoose.model("Post",PostSchema);

module.exports = Post;