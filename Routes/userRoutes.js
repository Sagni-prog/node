const express = require('express');
const fs = require('fs');


const users = JSON.parse(fs.readFileSync(`${__dirname}/../data/users.json`,'utf-8'));

    const getAllUsers = (req,res) => {
      res.status(200).json({
          status: 'success',
          results: users.length,
          data: {
               users
          }
          
      });
 }

const router = express.Router();

router
    .route('/')
    .get(getAllUsers);
    
module.exports = router;    

