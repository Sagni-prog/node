const mongoose = require('mongoose');
const slugify = require('slugify');

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
});

 PostSchema.pre('save',function(next){
     this.slug = slugify(this.title,{lower: true});
   
     next();
 }); 
 
 PostSchema.pre('save',function(next){
 
    this.post_photo.photo_name = this.title;
    
    next();
   
 });
 
 PostSchema.pre('find', function(next){
    $post = this.find({ title: {$ne: "test document middleware"}});
    
    console.log($post);
   
   next();
 })

const Post = mongoose.model("Post",PostSchema);

module.exports = Post;