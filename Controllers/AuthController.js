const jwt = require('jsonwebtoken');
const User = require('./../Models/User');


exports.signup = async(req,res) => {
 
try {
    const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    });
    
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET,
    {expiresIn: process.env.JWT_EXPIRATION_TIME}); 
    
    res.status(201).json({
        status: 'success',
        token: token,
        data: {
           user
        }
    });
} catch (error) {
    return res.status(400).json({
        status: 'fail',
        message: error
     });
  }  
}