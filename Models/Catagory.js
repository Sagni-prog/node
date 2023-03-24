const mongoose = require('mongoose');

const CatagorySchema = mongoose.Schema({
    catagory_name:  {
          type: String,
          required: [true,'Catagory name is required']
      },
      created_at: {
        type:Date,
        default: Date.now()
     },
     updated_at: Date,
     deleted_at: Date
});

PostSchema.methods.catagoryUpdatedAt = function(){
    this.updatad_at = Date.now() - 1000;
    next();
 }
 
 PostSchema.methods.catagoryDeletedAt = function(){
    this.updatad_at = Date.now() - 1000;
    next();
 }

const Catagory = mongoose.model('Catagory',CatagorySchema);
module.exports = Catagory;