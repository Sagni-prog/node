const mongoose = require('mongoose');

const CatagorySchema = mongoose.Schema({
    catagory_name:  {
          type: String,
          required: [true,'Catagory name is required']
      }
});

const Catagory = mongoose.model('Catagory',CatagorySchema);
module.exports = Catagory;