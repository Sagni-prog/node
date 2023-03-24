const mongoose = require('mongoose');

const ReplayLikeSchema = mongoose.Schema({
     isLIked: {
            type: Boolean,
            default: true
     },
     liker: Object,
     replay: {
        type: mongoose.Schema.ObjectId,
        ref: 'Replay'
     },
     created_at: {
        type:Date,
        default: Date.now()
     },
     updated_at: Date,
     deleted_at: Date
});

const ReplayLike = mongoose.model('ReplayLike',ReplayLikeSchema);
module.exports = ReplayLike;