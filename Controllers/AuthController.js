const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const crypto = require('crypto')
const User = require('./../Models/User');
const AppError = require('./../utils/appError');
const SendEmail = require('./../Mails/ResetPasswordMail');
 
const generateToken = id => {
    return jwt.sign({id: id}, process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRATION_TIME}); 
}

const filterObj = (obj,...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach(el => {
       if(allowedFields.includes(el)) newObj[el] = obj[el];
    });
    
    return newObj;
    
}

exports.index = async(req,res,next) => {
    const users = await User.find();
    res.status(200).json({
       status: "success",
       data: {
          users
       }
    });
    
    next()
}
exports.signup = async(req,res) => {
  
try {
    const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        role: req.body.role
    });
    
    const token = generateToken(user._id); 
    
    res.status(201).json({
        status: 'success',
        token: token,
        data: {
           user
        }
    });
} catch (error) {
    return res.status(400).json({
        status: 'fail',
        message: error
     });
  }  
}

exports.login = async(req,res,next) => {
     const { email,password } = req.body;
     
     if(!email || !password){
         return next(new AppError("Please provide your email and password",400)); 
     }
     const user = await User.findOne({ email }).select('+password');    
    if(!user || !(await user.authenticate(password,user.password))){
        return next(new AppError("Incorrect email or password",401))
    }
    
    const token = generateToken(user._id); 
    const cookieOptions = {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRATION_TIME * 24 * 60 * 60 * 1000 ),
        httpOnly: true
  }
  
  if(process.env.NODE_ENV === 'production') cookieOptions.secure = true;
    res.cookie('jwt',token,cookieOptions);
    
    res.status(201).json({
        status: 'success',
        token: token,
        data: {
           user
        }
    });   
}


exports.authorize = (role) => {
     return (req,res,next) => {
         if(!(req.user.role === role)){
             return next(
                    new AppError('Anuthorized',401)
             ); 
         }
         next();
      }
}

exports.forgetPassword = async (req,res) => {
 
    const user = await User.findOne({ email: req.body.email });
    
  
    if(!user){
         return next(new AppError('No user with this email',404))
    }
    
    const resetToken = await user.createPasswordResetToken();
    user.save({ validateBeforeSave: false});
    
    const protocol = req.protocol;
    const host = req.get('host');
    const resetURL = `${protocol}://${host}/api/v1/users/reset-password/${resetToken}`
    const message = `Click this link ${resetURL} to reset your password, just send vai mailtrap just nows!`;
   await SendEmail({
       subject: "this is test email",
       message
    });
    
    res.status(200).json({
       status: 'success',
       message: 'Token sent to your email, check your email please!',
    })
}

exports.resetPassword = async (req,res,next) => {
   const hashedToken = crypto
           .createHash('sha256')
           .update(req.params.token)
           .digest('hex');
           
  const user = await User.findOne({
              passwordResetToken: hashedToken,
              passwordResetTokenExpires_at: {$gt: Date.now()}
  });
  
  if(!user){
       return next(new AppError('Invalid token',400))
  }
  
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetTokenExpires_at = undefined;
  await user.save();
  
  const token = generateToken(user._id);
  
   res.status(200).json({
        status: 'sucess',
        token
  })
}

exports.updatePassword = async (req,res,next) => {
   
    const user = await User.findById(req.user.id).select('+password');
    if(!await user.authenticate(req.body.currentPassword,user.password)){
       return next(new AppError('your current password is wrong',401));
    }
    
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save();
    
    const token = generateToken(user._id);
    
    res.status(200).json({
       status: 'sucess',
       token
    });
    
}

exports.udateUser = async (req,res,next) => {
   if(req.body.password || req.body.passwordConfirm){
      return next(
              new AppError('You cant update your password here!',400)
      );
   }
    
    // filtering only fields to be updated
   const filterBody = filterObj(req.body,'name','email');
   
   console.log(filterBody);
   const user = await User.findByIdAndUpdate(req.user._id,filterBody,{
         new: true,
         runValidators: true
   });
   
   return res.status(200).json({
       status: 'sucess',
       data: {
              user
       }
   })
}

exports.deleteUser = async (req,res,next) => {
     const user = await User.findByIdAndUpdate(req.user._id,{ active: false });
     
     res.status(204).json({
        status: 'success',
        data: {  
            user
        }
     });
     
}