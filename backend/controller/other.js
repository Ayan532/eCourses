const BigPromises = require("../middlware/BigPromises");
const Request = require("../models/Request");
const Stats = require("../models/Stats");
const User = require("../models/User");
const ErrorHandler = require("../utils/ErrorHandler");

exports.requestCourse=BigPromises(async(req, res, next) =>{

   const {title,description}=req.body
   console.log(title,description);
   if(!title || !description) return next(new ErrorHandler(`Please Add the required Feild`,400))
   const user=await User.findById(req.user._id)
  const requestCourse=await Request.create({
    title,description,
    name:user.name,
    email:user.email
  })
  console.log(requestCourse);

  res.status(200).json({
    success: true,
    message:"Request sent successfully"
  })






})
exports.deleterequestCourse=BigPromises(async(req, res, next) =>{

  const request=await Request.findById(req.params.id)
  await request.remove()
  res.status(200).json({
    success: true, 
    message:"Request was successfully removed"
  })






})
exports.getrequestCourse=BigPromises(async(req, res, next) =>{

  const request=await Request.find({})
  res.status(200).json({
    success: true, 
    request
  })






})


exports.getDashboardStats=BigPromises(async(req, res, next) =>{

  const stats=await Stats.find({}).sort({createdAt:"desc"}).limit(12)

   const statsData=[];
   
   for(let i=0; i<stats.length; i++){
       
       statsData.push(stats[i])
       
    }
    const requiredSize=12-stats.length

    for(let i=0; i<requiredSize; i++){
       
        statsData.unshift({
            users:0,
            subscriptions:0,
            views:0
        })
        
    }
    const usersCount=statsData[11].users
    const subcriptionCount=statsData[11].subscriptions
    const viewsCount=statsData[11].views

    let userProfit=true,viewsProfit=true,subscriptionProfit=true
    let userPercentage=0,viewsPercentage=0,subscriptionsPercentage=0


    if(statsData[10].users===0) userPercentage=usersCount*100
    if(statsData[10].views===0) viewsPercentage=viewsCount*100
    if(statsData[10].subscriptions===0) subscriptionsPercentage=subcriptionCount*100
     
   
     else{
        const difference={
            users:statsData[11].users - statsData[10].users,
            views:statsData[11].views - statsData[10].views,
            subscriptions:statsData[11].subscriptions - statsData[10].subscriptions,
        }

        userPercentage=difference.users/statsData[10].users*100;
        viewsPercentage=difference.views/statsData[10].views*100;
        subscriptionsPercentage=difference.subscriptions/statsData[10].subscriptions*100;
       
        if(userPercentage < 0) userProfit=false
        if(viewsPercentage < 0) viewsProfit=false
        if(subscriptionsPercentage < 0) subscriptionProfit=false
    }


  res.status(200).json({
    success:true,
    stats:statsData,
    usersCount,
    subcriptionCount,
    viewsCount,
    subscriptionsPercentage,viewsPercentage,userPercentage,
     userProfit,viewsProfit,subscriptionProfit 
  })
    



})