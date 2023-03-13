const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const postRouter = require('./Routes/postRoutes');
const userRouter = require('./Routes/userRoutes');

const app = new express();
app.use(express.json());
app.use(morgan('dev'));

app.use((req,res,next) => {
   console.log("middleware");
   next();
});

 
 app.use('/api/v1/posts',postRouter);
 app.use('/api/v1/users',userRouter);





const port = 4000;
app.listen(port,() => {
     console.log("app running on port 4000");
});