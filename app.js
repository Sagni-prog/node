const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const postRouter = require('./Routes/postRoutes');
const userRouter = require('./Routes/userRoutes');
// const PostController = require('./Controllers/PostController');

dotenv.config({path: './.env'});

const app = express();

app.use(express.json());

if(process.env.NODE_ENV === 'development'){
   app.use(morgan('dev'));
}
app.use(express.static(`${__dirname}/public`));

app.use((req,res,next) => {
   console.log("middleware");
   next();
});
 
app.get('/',(req,res) => {
   
    res.status(200).send("this is from express");
});

 
 app.use('/api/v1/posts',postRouter);
 app.use('/api/v1/users',userRouter);

   
app.all('*',(req,res,next) => {
    // res.status(404).json({
    //     status: "fail",
    //     message: `Cant find ${req.originalUrl} on this server`
    // });
    
    // next();
    
    const err = new Error(`Cant find ${req.originalUrl} on this server`);
    err.status = "fail";
    err.statusCode = 404;
    
    next(err);
   
});

app.use((err,req,res,next) => {

   console.log(err.stack);
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';  
    
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    });
    
    next();
});

module.exports = app;



