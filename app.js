const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');
const postRouter = require('./Routes/postRoutes');
const userRouter = require('./Routes/userRoutes');
const AppError = require('./utils/appError');
const errorController = require('./Controllers/errorController');
const AuthController = require('./Controllers/AuthController');


dotenv.config({path: './.env'});

const app = express();

app.use(express.json());

if(process.env.NODE_ENV === 'development'){
   app.use(morgan('dev'));
}

const limit = rateLimit({
   max: 100, 
   windowMS: 60 * 60 * 1000, 
   message: 'To many requests from this IP, please try again in an just hour'
});

app.use('/api',limit);
app.use(express.static(`${__dirname}/public`));

app.use((req,res,next) => {
   console.log("middleware");
   next();
});


 app.use('/api/v1/posts',postRouter);
 app.use('/api/v1/users',userRouter);
 app.post('/api/v1/forget-password',AuthController.forgetPassword);
 app.patch('/api/v1/users/reset-password/:token',AuthController.resetPassword);
 app.patch('/api/v1/users/update-password',AuthController.protect,AuthController.updatePassword);
 app.patch('/api/v1/users/update',AuthController.protect,AuthController.udateUser);
 app.delete('/api/v1/users/delete',AuthController.protect,AuthController.deleteUser);

   
app.all('*',(req,res,next) => {
    // res.status(404).json({
    //     status: "fail",
    //     message: `Cant find ${req.originalUrl} on this server`
    // });
    
    // next();
    
    // const err = new Error(`Cant find ${req.originalUrl} on this server`);
    // err.status = "fail";
    // err.statusCode = 404;
    
    next(new AppError(`Cant find ${req.originalUrl} on this server`,404));
   
});

app.use(errorController);

module.exports = app;



