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

const Comment = mongoose.model('Comment',CommentSchema);

module.exports = Comment;
