const User = require('./../Models/User');

exports.signup = async(req,res) => {

try {
    const user = await User.create(req.body);
    res.status(201).json({
        status: 'success',
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