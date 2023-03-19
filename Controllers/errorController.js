const AppError = require("../utils/appError");

const handleDBCastError = (err) => {
   const message = `Invalid ${err.path}: ${err.value}`;
   return new AppError(message,400);
}

const handleDBDuplicateError = (error) => {
    message = `Duplicate field value: x. Please use another value`;
    return new AppError(message,400);
}
 module.exports = (err,req,res,next) => {

    console.log(err.stack);
     err.statusCode = err.statusCode || 500;
     err.status = err.status || 'error';  
     
    const sendErrorProduction = (err,res) => {
      if(err.isOperational){
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
       }else{
       
       console.error("ERROR: ",err);
       
          res.status(500).json({
             status: "error",
             message: "Oops something went wrong!"
          });
       }
    }
     
  if(process.env.NODE_ENV === 'development'){   
     
     res.status(err.statusCode).json({
         status: err.status,
         error: err,
         message: err.message,
         stack: err.stack 
     });  
     
         next();
     } else if(process.env.NODE_ENV === 'production'){
     
     let error = { ...err };
     
     if(error.name === 'CastError') error = handleDBCastError(error)
     
     if(error.code === 11000) error = handleDBDuplicateError(error);
     
       sendErrorProduction(error,res);
  }
}