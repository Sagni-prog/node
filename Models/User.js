const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

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
     role: {
            type: String,
            enum: ['user','admin','author'],
            default: 'user'
     },
     passwordConfirm: {
        type: String,
        required: [true,'Please confirm your password'],
        validate: {
           validator: function(el){
              return el === this.password;
           }
        }
     },
     passwordChanged_at: Date,
     passwordResetToken: String,
     passwordResetTokenExpires_at: Date,
     active: {
        type: Boolean,
        default: true,
        select: false
     },
     created_at: {
      type: Date,
      default: Date.now()
  },
   update_at: Date,
   deleted_at: Date 
});

UserSchema.pre('save',async function(next){
   if(!this.isModified('password')) return next();
    
     this.password = await bcrypt.hash(this.password,12);
     
     this.passwordConfirm = undefined;
     next();
      
});

UserSchema.pre('save',function(next){
   if(!this.isModified('password') || this.isNew) return next();
   
   this.passwordChanged_at = Date.now() - 1000;
    next();
});

UserSchema.methods.useDeletedAt = function(){
   this.deleted_at = Date.now() - 1000; 
};

UserSchema.methods.useUpdatedAt = function(){
   this.updated_at = Date.now() - 1000; 
};


UserSchema.methods.authenticate = async function(password,userPassword){
   return await bcrypt.compare(password,userPassword);
}

UserSchema.methods.changedPasswordAfter = async function(JWTTimestamp){
      if(this.passwordChanged_at){
              const changedAtTimestamp = parseInt(
                     this.passwordChanged_at.getTime() /1000,
                     10
              );
              
              return await JWTTimestamp < changedAtTimestamp;
          }
          
         return false;
   }
   
   UserSchema.methods.createPasswordResetToken = async function(){
     
       const resetToken = crypto.randomBytes(32).toString('hex');
       
      this.passwordResetToken = crypto
         .createHash('sha256')
         .update(resetToken)
         .digest('hex');
               
      this.passwordResetTokenExpires_at = Date.now() + 10 * 60 *1000;
      
      return resetToken;
       
   }

const User = mongoose.model('User',UserSchema);
module.exports = User;