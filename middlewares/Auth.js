const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('./../Models/User');
const AppError = require('./../utils/appError');


const Auth = async(req,res,next) => {
   
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
 
 module.exports = Auth;