const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
     name: {
        type: String,
        required: [true,'Please tell us your name']
     },
     email: {
        type: String,
        required: [true,'Please provide your email'],
        unique: [true,'This email is used please another email address'],
        validate: [validator.isEmail,'Please provide the valid email']
     },
     photo: String,
     password: {
        type: String,
        required: [true,'Please fill your password'],
        minlength: 8
     },
     passwordConfirm: {
        type: String,
        required: [true,'Please confirm your password'],
        validate: {
           validator: function(el){
              return el === this.password;
           }
        }
     }
     
});

const User = mongoose.model('User',UserSchema);
module.exports = User;