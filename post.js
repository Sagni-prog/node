const express = require('express');
const fs = require('fs');
const dotenv = require('dotenv');

const morgan = require('morgan');
const postRouter = require('./Routes/postRoutes');
const userRouter = require('./Routes/userRoutes');

dotenv.config({path: './config.env'});



const app = new express();
app.use(express.json());

if(process.env.NODE_ENV === 'development'){
   app.use(morgan('dev'));
}
app.use(express.static(`${__dirname}/public`));

app.use((req,res,next) => {
   console.log("middleware");
   next();
});

 app.use('/api/v1/posts',postRouter);
 app.use('/api/v1/users',userRouter);
 
//  console.log(process.env)
//  console.log(process.env.password)

const port = process.env.port;
app.listen(port,() => {
     console.log("app running on port 4000");
});