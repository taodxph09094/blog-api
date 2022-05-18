const Post = require("../models/postModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");

//Create post -- Admin
exports.createPost = catchAsyncErrors(async (req, res, next) => {
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "posts",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.user = req.user.id;

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
exports.getAdminPosts = catchAsyncErrors(async (req, res, next) => {
  const posts = await Post.find();

  res.status(200).json({
    success: true,
    posts,
  });
});

//Update Post

exports.updatePost = catchAsyncErrors(async (req, res, next) => {
  let post = await Post.findById(req.params.id);

  if (!post) {
    return next(new ErrorHander("Không tìm thấy bài viết", 404));
  }

  // Images Start Here
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < post.images.length; i++) {
      await cloudinary.v2.uploader.destroy(post.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "posts",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    post,
  });
});

//Detele post

exports.deletePost = catchAsyncErrors(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new ErrorHander("Không tìm thấy bài viết", 404));
  }

  // Deleting Images From Cloudinary
  for (let i = 0; i < post.images.length; i++) {
    await cloudinary.v2.uploader.destroy(post.images[i].public_id);
  }

  await post.remove();

  res.status(200).json({
    success: true,
    message: "Xóa bài viết thành công!",
  });
});

//Get product details

exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new ErrorHander("Bài viết không tồn tại", 404));
  }
  res.status(200).json({ success: true, post });
});

// Create New Review or Update the review
exports.createPostReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, postId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const post = await Post.findById(postId);

  const isReviewed = post.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    post.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    post.reviews.push(review);
    post.numOfReviews = post.reviews.length;
  }

  let avg = 0;

  post.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  post.ratings = avg / post.reviews.length;

  await post.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get All Reviews of a post
exports.getPostReviews = catchAsyncErrors(async (req, res, next) => {
  const post = await Post.findById(req.query.id);

  if (!post) {
    return next(new ErrorHander("Bài viết không tồn tại", 404));
  }

  res.status(200).json({
    success: true,
    reviews: post.reviews,
  });
});

// Delete Review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const post = await Post.findById(req.query.productId);

  if (!post) {
    return next(new ErrorHander("Bài viết không tồn tại", 404));
  }

  const reviews = post.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Post.findByIdAndUpdate(
    req.query.postId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});
