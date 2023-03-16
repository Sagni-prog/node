const mongoose = require('mongoose');
const app = require('./app');


mongoose
   .connect(process.env.DATABASE_LOCAL,{
       useNewUrlParser: true
   })
    .then((conn) => {
    
      console.log("connected");
    })
    .catch(() => console.log("not able to connect to the database"));

const port = process.env.PORT;
app.listen(port, () => {
   console.log(`App on ${process.env.NODE_ENV} running on port: ${port}`);
});