const Sub = require("../models/fbAndSub");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");

// Create Sub -- Admin
exports.createSub = catchAsyncErrors(async (req, res, next) => {
  const sub = await Sub.create(req.body);

  res.status(201).json({
    success: true,
    sub,
  });
});

// Get All Sub
exports.getAllSubs = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 8;
  const subsCount = await Sub.countDocuments();

  const apiFeature = new ApiFeatures(Sub.find(), req.query).search().filter();

  let subs = await apiFeature.query;

  let filteredSubsCount = subs.length;

  apiFeature.pagination(resultPerPage);

  res.status(200).json({
    success: true,
    subs,
    subsCount,
    resultPerPage,
    filteredSubsCount,
  });
});

// Get All Sub (Admin)
exports.getAdminSubs = catchAsyncErrors(async (req, res, next) => {
  const subs = await Sub.find();

  res.status(200).json({
    success: true,
    subs,
  });
});

// Get Sub Details
exports.getSubDetails = catchAsyncErrors(async (req, res, next) => {
  const sub = await Sub.findById(req.params.id);

  if (!sub) {
    return next(new ErrorHander("Danh mục không tồn tại", 404));
  }

  res.status(200).json({
    success: true,
    sub,
  });
});

// Update Tag -- Admin

exports.updateSub = catchAsyncErrors(async (req, res, next) => {
  let sub = await Sub.findById(req.params.id);

  if (!sub) {
    return next(new ErrorHander("Danh mục không tồn tại", 404));
  }

  sub = await Sub.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    sub,
  });
});

// Delete Sub

exports.deleteSub = catchAsyncErrors(async (req, res, next) => {
  const sub = await Sub.findById(req.params.id);

  if (!sub) {
    return next(new ErrorHander("Danh mục không tồn tại", 404));
  }

  await sub.remove();

  res.status(200).json({
    success: true,
    message: "Xóa danh mục thành công",
  });
});
