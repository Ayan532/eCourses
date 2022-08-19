const ErrorHandler = require("../utils/ErrorHandler");
const BigPromises = require("./BigPromises");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
exports.isAuthenticated=BigPromises(async(req,res,next)=>{
    const token=req.cookies.token
    if(!token) return next(new ErrorHandler('Please Login In',401))

    const decode=jwt.verify(token,process.env.JWT_SECRET)

    req.user=await User.findById(decode._id)
    
    next();
     

});
exports.isAdmin=BigPromises((req,res,next)=>{
      
    if(req.user.role!=='admin'){
        return next(new ErrorHandler('You Cannot Acces this resourse',409));  
    }
    
    next();
     

});

exports.isSubscriber=BigPromises((req,res,next)=>{
    if(req.user.subscription.status!=='active' && req.user.role!=='admin'){
        return next(new ErrorHandler('Please Subscribe to Access the Contents',404))
    }
    next()

})