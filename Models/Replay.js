const mongoose = require('mongoose');

const ReplaySchema = mongoose.Schema({
   replay: {
      type: String,
      required: [true,'Replay is qequired']
   },
      author: Object,
      post: {
         type: mongoose.Schema.ObjectId,
         ref: 'Post'
   },
   created_at: {
      type:Date,
      default: Date.now()
   },
   updated_at: Date,
   deleted_at: Date
});

PostSchema.methods.replayUpdatedAt = function(){
   this.updatad_at = Date.now() - 1000;
   next();
}

PostSchema.methods.replayDeletedAt = function(){
   this.updatad_at = Date.now() - 1000;
   next();
}

const Replay = mongoose.model('Replay',ReplaySchema);
module.exports = Replay;