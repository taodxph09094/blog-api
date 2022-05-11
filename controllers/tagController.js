const Tag = require("../models/tagModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");

// Create Tag -- Admin
exports.createTag = catchAsyncErrors(async (req, res, next) => {
  const tag = await Tag.create(req.body);

  res.status(201).json({
    success: true,
    tag,
  });
});

// Get All Tag
exports.getAllTags = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 8;
  const tagsCount = await Tag.countDocuments();

  const apiFeature = new ApiFeatures(Tag.find(), req.query).search().filter();

  let tags = await apiFeature.query;

  let filteredTagsCount = tags.length;

  apiFeature.pagination(resultPerPage);

  tags = await apiFeature.query;

  res.status(200).json({
    success: true,
    tags,
    tagsCount,
    resultPerPage,
    filteredTagsCount,
  });
});

// Get All Tag (Admin)
exports.getAdminTags = catchAsyncErrors(async (req, res, next) => {
  const tags = await Tag.find();

  res.status(200).json({
    success: true,
    tags,
  });
});

// Get Tag Details
exports.getTagDetails = catchAsyncErrors(async (req, res, next) => {
  const tag = await Tag.findById(req.params.id);

  if (!tag) {
    return next(new ErrorHander("Danh mục không tồn tại", 404));
  }

  res.status(200).json({
    success: true,
    tag,
  });
});

// Update Tag -- Admin

exports.updateTag = catchAsyncErrors(async (req, res, next) => {
  let tag = await Tag.findById(req.params.id);

  if (!tag) {
    return next(new ErrorHander("Danh mục không tồn tại", 404));
  }

  tag = await Tag.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    tag,
  });
});

// Delete Tag

exports.deleteTag = catchAsyncErrors(async (req, res, next) => {
  const tag = await Tag.findById(req.params.id);

  if (!tag) {
    return next(new ErrorHander("Danh mục không tồn tại", 404));
  }

  await tag.remove();

  res.status(200).json({
    success: true,
    message: "Xóa danh mục thành công",
  });
});
