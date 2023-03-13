const express = require('express');

const app = express();

app.get('/',(req,res) => {
   
    res.status(200).send("this is from express");
});

const port = 4000;
app.listen(port, () => {
   console.log("app running on port 4000");
});

