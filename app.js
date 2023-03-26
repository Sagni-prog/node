const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xssClean = require('xss-clean');
const postRouter = require('./Routes/postRoutes');
const userRouter = require('./Routes/userRoutes');
const commentRouter = require('./Routes/commentRoutes');
const likeRouter = require('./Routes/likeRoutes');
const AppError = require('./utils/appError');
const errorController = require('./Controllers/errorController');
const AuthController = require('./Controllers/AuthController');
 

dotenv.config({path: './.env'});

const app = express();

app.use(helmet());

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
app.use(mongoSanitize());
app.use(xssClean());


app.use(express.static(`${__dirname}/public`));
app.use(express.static(`${__dirname}/public/img/posts`));
app.use(express.static(`${__dirname}/public/img/users`));
 
app.use((req,res,next) => {
   console.log("middleware");
   next();
});


 app.use('/api/v1/posts',postRouter);
 app.use('/api/v1/users',userRouter);
 app.use('/api/v1/comments',commentRouter);
 app.use('/api/v1/likes',likeRouter);

   
app.all('*',(req,res,next) => {
   
    next(new AppError(`Cant find ${req.originalUrl} on this server`,404));
   
});

app.use(errorController);

module.exports = app;



