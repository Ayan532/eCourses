const BigPromises = require("../middlware/BigPromises");
const User = require("../models/User");
const { CookieToken } = require("../utils/CookieToken");
const ErrorHandler = require("../utils/ErrorHandler");
const { SendEmail } = require("../utils/SendEmail");
const crypto = require("crypto");
const Course = require("../models/Course");
const { getUriData } = require("../utils/DataURi");
const cloudinary = require("cloudinary");
const Stats = require("../models/Stats");
const razorpay = require('razorpay');
const Subcription = require("../models/Subcription");

exports.registerUser = BigPromises(async (req, res, next) => {
  const { name, email, password } = req.body;
  const file = req.file;

  if (!name || !email || !password || !file) {
    return next(new ErrorHandler("Please add all feilds", 400));
  }

  let user = await User.findOne({ email });

  if (user) {
    return next(new ErrorHandler("Account already exists", 409));
  }

  const fileUri = getUriData(file);

  const result = await cloudinary.v2.uploader.upload(fileUri.content, {
    folder: "eCourses/Users",
    width: 150,
    crop: "scale",
  });

  user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: result.public_id,
      url: result.secure_url,
    },
  });

  CookieToken(res, user, `${user.name} Registred Successfully`, 201);
});

exports.loginUser = BigPromises(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please add all feilds", 400));
  }

  let user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Please create a Account first", 400));
  }

  const isMatched = await user.comparePassword(password);

  if (!isMatched) {
    return next(new ErrorHandler("Incorrect Email or password", 400));
  }

  CookieToken(res, user, `Welcome back,${user.name}`, 200);
});

exports.logoutUser = BigPromises(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
      secure: true,
      sameSite: "none",
    })
    .json({
      success: true,
      message: "Logged out successfully",
    });
});

exports.getMyProfile = BigPromises(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return next(new ErrorHandler("unauthorized", 401));
  }

  res.status(200).json({
    success: true,
    user,
  });
});

exports.deleteMyProfile = BigPromises(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  await cloudinary.v2.uploader.destroy(user.avatar.public_id, {
    folder: "eCourses/Users",
  });

  if (user.subscription.status === "active") {
    const subscriptionId = user.subscription.id;

    let refund = false;

    let instance = new razorpay({
      key_id: process.env.RAZORPAY_API_KEY,
      key_secret: process.env.RAZORPAY_SECRET_KEY,
    });

    await instance.subscriptions.cancel(subscriptionId);

    const payemnt = await Subcription.findOne({
      razorpay_subscription_id: subscriptionId,
    });

    const gap = Date.now() - payemnt.createdAt;

    const refundTime = process.env.REFUND_DAYS * 24 * 60 * 60 * 1000;

    if (refundTime > gap) {
      await instance.payments.refund(payemnt.razorpay_payment_id);
      refund = true;
    }

    await payemnt.remove();

    user.subscription.id = undefined;
    user.subscription.status = undefined;
  }

  await user.remove();

  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
      secure: true,
      sameSite: "none",
    })
    .json({
      success: true,
      message:refund?"Subcriptions Cancelled you will receive refund within 7 days":"Subcription cancelled, No Refund as Subcription cancelled after 7 days"
    });
});

exports.changePassword = BigPromises(async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return next(new ErrorHandler("Please enter all feilds", 400));
  }

  const user = await User.findById(req.user._id).select("+password");

  if (!user) {
    return next(new ErrorHandler("unauthorized", 401));
  }

  const isMatched = await user.comparePassword(oldPassword);

  if (!isMatched) {
    return next(new ErrorHandler("Incorrect Old Password", 400));
  }

  user.password = newPassword;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Password changed successfully",
  });
});

exports.updateProfile = BigPromises(async (req, res, next) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return next(new ErrorHandler("Please enter all feilds", 400));
  }

  const user = await User.findById(req.user._id);

  if (!user) {
    return next(new ErrorHandler("unauthorized", 401));
  }

  user.name = name;
  user.email = email;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
  });
});

exports.updateProfilePicture = BigPromises(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    return next(new ErrorHandler("unauthorized", 401));
  }
  const file = req.file;

  const fileUri = getUriData(file);

  const result = await cloudinary.v2.uploader.upload(fileUri.content, {
    folder: "eCourses/Users",
    width: 150,
    crop: "scale",
  });

  await cloudinary.v2.uploader.destroy(user.avatar.public_id, {
    folder: "eCourses/Users",
  });

  user.avatar = {
    public_id: result.public_id,
    url: result.secure_url,
  };
  await user.save();

  res.status(200).json({
    success: true,
    message: "Profile Picture Updated successfully",
  });
});

exports.forgetPassword = BigPromises(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return next(new ErrorHandler("Invalid Email", 400));
  }

  const resetToken = await user.getResetToken();
  await user.save();
  const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;
  const message = `Click on the Link to reset your password.\n\n${resetUrl}\nIgnore if you dont sent it. `;
  //Send token via email
  try {
    await SendEmail(user.email, "eCourses Reset Password", message);

    res.status(200).json({
      success: true,
      message: `Email sent successfully to ${email}`,
    });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiry = undefined;

    await user.save();

    return next(new ErrorHandler(err.message, 500));
  }
});

exports.resetPassword = BigPromises(async (req, res, next) => {
  const { token } = req.params;

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpiry: {
      $gt: Date.now(),
    },
  });
  if (!user) {
    return next(new ErrorHandler("Token Expired", 401));
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler(`Password mismatched`, 500));
  }
  user.password = req.body.password;

  user.resetPasswordToken = undefined;
  user.resetPasswordExpiry = undefined;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Password has been reset successfully",
  });
});

exports.addtoPlayList = BigPromises(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    return next(new ErrorHandler("unauthorized", 401));
  }
  const course = await Course.findById(req.body.id);

  if (!course) {
    return next(new ErrorHandler("Course not found", 404));
  }

  const playlistExist = user.playlist.find((item) => {
    if (item.course.toString() === course._id.toString()) {
      return true;
    }
  });

  if (playlistExist) {
    return next(new ErrorHandler("Already Added to playlist", 409));
  }

  user.playlist.push({
    course: course._id,
    poster: course.poster.url,
  });
  await user.save();

  res.status(200).json({
    success: true,
    message: "Added to Playlist",
  });
});
exports.removefromPlayList = BigPromises(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    return next(new ErrorHandler("unauthorized", 401));
  }
  console.log(req.query.id);
  const course = await Course.findById(req.query.id);

  if (!course) {
    return next(new ErrorHandler("Course not found", 404));
  }

  const filterPlayList = user.playlist.filter((item) => {
    if (item.course.toString() !== course._id.toString()) return item;
  });
  console.log(filterPlayList);
  user.playlist = filterPlayList;
  await user.save();

  res.status(200).json({
    success: true,
    message: "Remove from Playlist",
  });
});

//Admin Controller

exports.getAllUsers = BigPromises(async (req, res, next) => {
  const users = await User.find({});

  if (!users) {
    return next(new ErrorHandler("No Users Available", 401));
  }

  res.status(200).json({
    success: true,
    users,
  });
});
exports.deleteUsers = BigPromises(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler("No Users Available", 401));
  }

  await cloudinary.v2.uploader.destroy(user.avatar.public_id, {
    folder: "eCourses/Users",
  });

  await user.remove();

  res.status(200).json({
    success: true,
    message: "Account deleted successfully",
  });
});

User.watch().on("change", async () => {
  const stats = await Stats.find({}).sort({ createdAt: "desc" }).limit(1);
  const subcription = await User.find({ "subscription.status": "active" });

  stats[0].users = await User.countDocuments();
  stats[0].subscriptions = subcription.length;
  stats[0].createdAt = new Date(Date.now());

  await stats[0].save();
});
