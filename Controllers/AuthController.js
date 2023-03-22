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
    
    res.status(201).json({
        status: 'success',
        token: token,
        data: {
           user
        }
    });   
}

exports.protect = async(req,res,next) => {
   
   let token;
   
   if( 
            req.headers.authorization && 
            req.headers.authorization.startsWith('Bearer')
        ){
      token = req.headers.authorization.split(' ')[1];
   }
   
   if(!token){
       return next(
                 new AppError(
                         "Anuthorized",
                         401
                  )
             );
        }
   
  const decoded = await promisify(jwt.verify)(token,process.env.JWT_SECRET);
  

  const currentUser = await User.findById(decoded.id);
  if(!currentUser){
     return(
         new AppError(
             "No User of this credential found",
             401
         )
     )
  }
  
  console.log("User: ",currentUser);
  
 
  
  if(await currentUser.changedPasswordAfter(decoded.iat)){
      return next(
                new AppError(
                       "You have changed your password",
                       401
                )
         )
  }
   
 req.user = currentUser;
 
    next();
}

exports.authorize = (role) => {
     return (req,res,next) => {
         if(!(req.user.role === role)){
         
         console.log(`the user is not authorized to perform this function your role is: ${req.user.role} but you need to have the: ${role}`)
             return next(
                    new AppError('Anuthorized',401)
             ); 
         }
         
         console.log(`user is authorized you have: ${req.user.role} role`);
         
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