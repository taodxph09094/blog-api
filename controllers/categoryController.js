const Category = require("../models/categoryModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");

// Create Category -- Admin
exports.createCategory = catchAsyncErrors(async (req, res, next) => {
  const category = await Category.create(req.body);

  res.status(201).json({
    success: true,
    category,
  });
});

// Get All Category
exports.getAllCategories = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 8;
  const categoriesCount = await Category.countDocuments();

  const apiFeature = new ApiFeatures(Category.find(), req.query)
    .search()
    .filter();

  let categories = await apiFeature.query;

  let filteredCategoriesCount = categories.length;

  apiFeature.pagination(resultPerPage);

  res.status(200).json({
    success: true,
    categories,
    categoriesCount,
    resultPerPage,
    filteredCategoriesCount,
  });
});

// Get All Category (Admin)
exports.getAdminCategories = catchAsyncErrors(async (req, res, next) => {
  const categories = await Category.find();

  res.status(200).json({
    success: true,
    categories,
  });
});

// Get Category Details
exports.getCategoryDetails = catchAsyncErrors(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(new ErrorHander("Danh mục không tồn tại", 404));
  }

  res.status(200).json({
    success: true,
    category,
  });
});

// Update Category -- Admin

exports.updateCategory = catchAsyncErrors(async (req, res, next) => {
  let category = await Category.findById(req.params.id);

  if (!category) {
    return next(new ErrorHander("Danh mục không tồn tại", 404));
  }

  category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    category,
  });
});

// Delete Category

exports.deleteCategory = catchAsyncErrors(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(new ErrorHander("Danh mục không tồn tại", 404));
  }

  await category.remove();

  res.status(200).json({
    success: true,
    message: "Xóa danh mục thành công",
  });
});
