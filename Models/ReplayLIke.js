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
     }
});

const ReplayLike = mongoose.model('ReplayLike',ReplayLikeSchema);
module.exports = ReplayLike;