const express=require('express');
const { getDashboardStats, requestCourse,getrequestCourse, deleterequestCourse} = require('../controller/other');
const { isAuthenticated, isAdmin, isSubscriber } = require('../middlware/isAuthenticated');

const router= express.Router();
 
router.route('/request/course').post(isAuthenticated,isSubscriber,requestCourse)
.get(isAuthenticated,isAdmin,getrequestCourse)
router.route('/request/course/:id').delete(isAuthenticated,isAdmin,deleterequestCourse)



//Admin Stats
router.route('/admin/stats').get(isAuthenticated,isAdmin,getDashboardStats)







module.exports = router