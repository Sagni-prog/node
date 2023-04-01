const mongoose = require('mongoose');
const { Sequelize } = require('sequelize');
const promisify = require('util');
const app = require('./app');


// mongoose
//    .connect(process.env.DATABASE_LOCAL,{
//        useNewUrlParser: true
//    })
//     .then((conn) => {
    
//       console.log("connected");
//     })
//     .catch(() => console.log("not able to connect to the database"));

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_DATABASE;
const sequelize = new Sequelize(database, username, password, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_CONNECTION
});

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

const port = process.env.PORT;
app.listen(port, () => {
   console.log(`App on ${process.env.NODE_ENV} running on port: ${port}`);
});