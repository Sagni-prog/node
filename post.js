const express = require('express');
const fs = require('fs');

const app = new express();


const posts = JSON.parse(fs.readFileSync(`${__dirname}/data/posts.json`,'utf-8'));

app.get('/api/v1/posts',(req,res) => {

      res.status(200).json({
            status: "success",
            data: {
                    posts 
             }
      });
});

const port = 4000;
app.listen(port,() => {
     console.log("app running on port 4000");
});