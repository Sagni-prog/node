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
  author: Object,
  created_at: {
     type: Date,
     default: Date.now()
 },
  updated_at: Date,
  deleted_at: Date
});

CommentSchema.methods.commentUpdatedAt = function(){
   this.updated_at = Date.now();
}

CommentSchema.methods.commentDeletedAt = function(){
   this.deleted_at = Date.now() - 1000;
}

const Comment = mongoose.model('Comment',CommentSchema);

module.exports = Comment;
