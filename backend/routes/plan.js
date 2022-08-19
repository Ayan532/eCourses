const express=require('express');
const { createSubscription, paymentVerification, getRazorpayKey, cancelSubcription } = require('../controller/plan');

const { isAdmin, isAuthenticated } = require('../middlware/isAuthenticated');

const router= express.Router();
 

router.route('/subscribe').get(isAuthenticated,createSubscription)
router.route('/payment/verfication').post(isAuthenticated,paymentVerification)
router.route('/razorpaykey').get(getRazorpayKey)
router.route('/subcription/cancel').delete(isAuthenticated,cancelSubcription)


module.exports = router