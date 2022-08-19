const express=require('express');
const { registerUser, loginUser, logoutUser, getMyProfile, changePassword, updateProfile, resetPassword, forgetPassword, addtoPlayList, removefromPlayList, updateProfilePicture, getAllUsers, deleteMyProfile, deleteUsers } = require('../controller/user');
const { isAuthenticated, isAdmin } = require('../middlware/isAuthenticated');
const { singleupload } = require('../middlware/Multer');

const router= express.Router();
 
router.route('/register').post(singleupload,registerUser)
router.route('/login').post(loginUser)
router.route('/logout').get(logoutUser)
router.route('/me')
      .get(isAuthenticated,getMyProfile)
      .delete(isAuthenticated,deleteMyProfile)
router.route('/me/password/update').put(isAuthenticated,changePassword)
router.route('/me/update').put(isAuthenticated,updateProfile)
router.route('/me/profilepicture').put(isAuthenticated,singleupload,updateProfilePicture)


router.route('/forgetpassword').post(forgetPassword)
router.route('/resetpassword/:token').put(resetPassword)


router.route('/addtoplaylist').post(isAuthenticated,addtoPlayList)
router.route('/removeplaylist').delete(isAuthenticated,removefromPlayList)



//Admin Routes
router.route('/admin/users').get(isAuthenticated,isAdmin,getAllUsers)
router.route('/admin/users/:id').delete(isAuthenticated,isAdmin,deleteUsers)





module.exports = router