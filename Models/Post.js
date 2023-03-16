const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({

     title: {
      type: String,
      required: [true,"Title is required"]
     },
     post_body: {
         type: String,
         required: [true,"Post Body is required"]
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

const Post = mongoose.model("Post",PostSchema);

module.exports = Post;