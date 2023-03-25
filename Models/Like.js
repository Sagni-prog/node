const mongoose = require('mongoose');

const LikeSchema = mongoose.Schema({
    isLiked: {
        type: Boolean,
        default: false
    },
    liker: Object,
    post: Object,
    created_at: {
        type:Date,
        default: Date.now()
     },
     updated_at: Date,
     deleted_at: Date
});

const Like = mongoose.model('Like',LikeSchema);
module.exports = Like;