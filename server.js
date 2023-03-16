const app = require('./app');

const port = process.env.PORT;
app.listen(port, () => {
   console.log(`App on ${process.env.NODE_ENV} running on port: ${port}`);
});