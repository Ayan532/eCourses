const BigPromises = require("../middlware/BigPromises");
const User = require("../models/User");
const razorpay = require('razorpay')
const crypto=require('crypto');

const ErrorHandler = require("../utils/ErrorHandler");
const Subcription = require("../models/Subcription");

exports.createSubscription=BigPromises(async(req,res,next)=>{

    let instance =  new razorpay({ 
          key_id: process.env.RAZORPAY_API_KEY, 
          key_secret: process.env.RAZORPAY_SECRET_KEY 
      })
  
    const user=await User.findById(req.user._id)

    if(user.role==='admin'){
        return next(new ErrorHandler(` ${user.role} cannot buy subscription`,404));
    }




    
     
    const plan_id=process.env.PLAN_ID

  const subscription= await instance.subscriptions.create({
        plan_id: plan_id,
        customer_notify: 1,
        total_count: 12,
    })

      
 user.subscription.id=subscription.id
 user.subscription.status=subscription.status
 
 await user.save()

 res.status(201).json({
    success: true,
    subscriptionId: subscription.id
 })

})
exports.paymentVerification=BigPromises(async(req,res,next)=>{
    const {razorpay_signature,razorpay_payment_id,razorpay_subscription_id}=req.body


    let instance =  new razorpay({ 
          key_id: process.env.RAZORPAY_API_KEY, 
          key_secret: process.env.RAZORPAY_SECRET_KEY 
      })
  
    const user=await User.findById(req.user._id)

    const subcription_id=user.subscription.id

    const signature=crypto.createHmac('sha256',process.env.RAZORPAY_SECRET_KEY).update(razorpay_payment_id+"|"+subcription_id,"utf-8")
    .digest("hex")

    const isAuthentic=signature===razorpay_signature

    if(!isAuthentic) { return res.redirect(`${process.env.FRONTEND_URL}/paymentfail`)}
    
    await Subcription.create({
        razorpay_signature,
        razorpay_payment_id,
        razorpay_subscription_id
    })

    user.subscription.status ='active'
    await user.save()
    
     res.redirect(`${process.env.FRONTEND_URL}/paymentsuccess?reference=${razorpay_payment_id}`)

})

exports.getRazorpayKey=BigPromises(async(req,res,next)=>{

    res.status(200).json({
        success: true,
        key:process.env.RAZORPAY_API_KEY 
    })

})
exports.cancelSubcription=BigPromises(async(req,res,next)=>{


    const user=await User.findById(req.user._id)

    const subscriptionId=user.subscription.id

    let refund=false

    let instance =  new razorpay({ 
        key_id: process.env.RAZORPAY_API_KEY, 
        key_secret: process.env.RAZORPAY_SECRET_KEY 
    })

    await instance.subscriptions.cancel(subscriptionId);

    const payemnt=await Subcription.findOne({
        razorpay_subscription_id: subscriptionId,
    })

    const gap=Date.now() - payemnt.createdAt;

    const refundTime=process.env.REFUND_DAYS*24*60*60*1000

    if(refundTime > gap) {

        await instance.payments.refund(payemnt.razorpay_payment_id)
        refund=true
    }

   await payemnt.remove()
    
    user.subscription.id=undefined
    user.subscription.status=undefined

    await user.save()



    res.status(200).json({
        success: true,
       message:refund?"Subcriptions Cancelled you will receive refund within 7 days":"Subcription cancelled, No Refund as Subcription cancelled after 7 days"
    })

})