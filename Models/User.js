const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
        minlength: 8,
        select: false
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

UserSchema.pre('save',async function(next){
   if(!this.isModified('password')) return next();
    
     this.password = await bcrypt.hash(this.password,12);
     
     this.passwordConfirm = undefined;
     next();
      
});

UserSchema.methods.authenticate = async function(password,userPassword){
   return await bcrypt.compare(password,userPassword);
}

const User = mongoose.model('User',UserSchema);
module.exports = User;