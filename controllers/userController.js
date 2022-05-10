const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

// Register a User

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { userName, fullName, email, password, phone } = req.body;

  const user = await User.create({
    userName,
    fullName,
    email,
    password,
    phone,
    avatar: {
      public_id: "public_id",
      url: "secure_url",
    },
  });

  sendToken(user, 201, res);
});

//Login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { userName, password } = req.body;

  // checking if user has given password and email both

  if (!userName || !password) {
    return next(new ErrorHander("Vui lòng nhập tài khoản hoặc mật khẩu", 400));
  }

  const user = await User.findOne({ userName }).select("+password");

  if (!user) {
    return next(new ErrorHander("Tài khoản và mật khẩu không đúng !", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHander("Tài khoản và mật khẩu không đúng !", 401));
  }

  sendToken(user, 200, res);
});

// Logout User

exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Đăng xuất thành công!",
  });
});
