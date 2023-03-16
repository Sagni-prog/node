const express = require('express');
const fs = require('fs');
const dotenv = require('dotenv');
const morgan = require('morgan');
const mongoose = require('mongoose');
const postRouter = require('./Routes/postRoutes');
const userRouter = require('./Routes/userRoutes');

dotenv.config({path: './config.env'});

mongoose
   .connect(process.env.DATABASE_LOCAL,{
       useNewUrlParser: true,
      //  useCreateIndex: true,
      //  useFindAndModify: false
   })
    .then((conn) => {
    
      console.log("connected")
    })
    .catch(() => console.log("not able to connect to the database"))

  const userShema = new mongoose.Schema({ 
           name: {
                 type: "string",
                 required: [true,"name is required"],
                 unique: true
           },
           email: {
                 type: "string",
                 required: [true,"email is required"]
              }
         }); 
   
   
   const User = mongoose.model('User',userShema);
   
   const newUser = new User({
         name: "Mike Bill",
         email: "mike@gmail.com",
   });
   
   newUser.save().then(doc => {
      console.log(doc);
   }).catch(err => {
     console.log(err);
   })
   
   const query = {name: "Mike"}
   
   User.find(query)
                   .then((person) => {
                      console.log(person);
                   })
                   .catch((err) => {
                      console.log(err)
                   })
   
   
   
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
 

const port = process.env.PORT;
app.listen(port,() => {
     console.log("app running on port 4000");
});