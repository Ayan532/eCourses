const { getAllCourse, createCourse, getCourseLectures, addCourseLectures, deleteCourse, admingetAllCourses,deleteCourseLecture ,getTrendingCourse} = require('../controller/course')

const express=require('express');
const { singleupload } = require('../middlware/Multer');
const { isAdmin, isAuthenticated, isSubscriber } = require('../middlware/isAuthenticated');

const router= express.Router();
 
router.route('/')
    .get(getAllCourse)
    .post(isAuthenticated,isAdmin,singleupload,createCourse)

router.route('/trendingcourse').get(getTrendingCourse)

router.route('/lecture').delete(isAuthenticated,isAdmin,deleteCourseLecture)
router.route('/:id')
      .get(isAuthenticated,isSubscriber,getCourseLectures)
      .post(isAuthenticated,isAdmin,singleupload,addCourseLectures)
      .delete(isAuthenticated,isAdmin,deleteCourse)

router.route('/admin/courses').get(isAuthenticated,isAdmin,admingetAllCourses)


module.exports = router