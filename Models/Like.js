const mongoose = require('mongoose');

const LikeSchema = mongoose.Schema({
    isLiked: {
        type: Boolean,
        default: false
    },
    liker: Object,
    post: {
         type: mongoose.Schema.ObjectId,
         ref: 'Post'
    }
});

const Like = mongoose.model('Like',LikeSchema);
module.exports = Like;