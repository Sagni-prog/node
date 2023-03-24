const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
  comment_body: {
     type: String,
     required: [true,'Comment is required']
  },
  post: {
      type: mongoose.Schema.ObjectId,
      ref: 'Post',
      required: true
  },
  author: {
     type: mongoose.Schema.ObjectId,
     ref: 'User',
     required: true
  },
  created_at: {
     type: Date,
     default: Date.now()
 },
  update_at: Date,
  deleted_at: Date
});

PostSchema.methods.commentUpdatedAt = function(){
   this.updatad_at = Date.now() - 1000;
   next();
}

PostSchema.methods.commentDeletedAt = function(){
   this.updatad_at = Date.now() - 1000;
   next();
}

const Comment = mongoose.model('Comment',CommentSchema);

module.exports = Comment;
