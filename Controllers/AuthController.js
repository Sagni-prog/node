const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('./../Models/User');
const AppError = require('./../utils/appError');

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
}
exports.signup = async(req,res) => {
  
try {
    const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
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

exports.protect = async (req,res,next) => {
   
   let token;
   
   if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
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
  
  const user = User.findById(decoded.id);
  if(!user){
     return(
         new AppError(
             "No User of this credential found",
             401
         )
     )
  }
  
  if(await user.isPasswordChangedAfterToken(decoded.iat)){
      return next(
                new AppError(
                       "You have changed your password",
                       401
                )
         )
  }
   
 this.user = user;
    next();
}