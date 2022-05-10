const Post = require("../models/postModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
//Create post -- Admin
exports.createPost = catchAsyncErrors(async (req, res, next) => {
  const post = await Post.create(req.body);

  res.status(201).json({
    success: true,
    post,
  });
});

// Get All post
exports.getAllPosts = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 8;
  const postsCount = await Post.countDocuments();

  const apiFeature = new ApiFeatures(Post.find(), req.query).search().filter();

  let posts = await apiFeature.query;

  let filteredPostsCount = posts.length;

  apiFeature.pagination(resultPerPage);

  // posts = await apiFeature.query;

  res.status(200).json({
    success: true,
    posts,
    postsCount,
    resultPerPage,
    filteredPostsCount,
  });
});

// // Get All post (Admin)
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
  const posts = await Post.find();

  res.status(200).json({
    success: true,
    posts,
  });
});

//Get all post
// exports.getAllPost = catchAsyncErrors(async (req, res) => {
//   const posts = await Post.find();
//   res.status(201).json({
//     success: true,
//     posts,
//   });
// });

//Update Post

exports.updatePost = catchAsyncErrors(async (req, res, next) => {
  let post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(500).json({
      success: false,
      message: "Bài viết không tồn tại",
    });
  }

  post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({ success: true, post });
});

//Detele post

exports.deletePost = catchAsyncErrors(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(500).json({
      success: false,
      message: "Bài viết không tồn tại",
    });
  }

  await post.remove();
  res.status(200).json({ success: true, message: "Xóa bài viết thành công" });
});

//Get product details

exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new ErrorHander("Bài viết không tồn tại", 404));
  }
  res.status(200).json({ success: true, post });
});
