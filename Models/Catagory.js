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

CatagorySchema.methods.catagoryUpdatedAt = function(){
    this.updatad_at = Date.now() - 1000;
 }
 
 CatagorySchema.methods.catagoryDeletedAt = function(){
    this.updatad_at = Date.now() - 1000;
 }

const Catagory = mongoose.model('Catagory',CatagorySchema);
module.exports = Catagory;