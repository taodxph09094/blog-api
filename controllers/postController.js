const Post = require("../models/postModel");

//Create post -- Admin
exports.createPost = async (req, res, next) => {
  const post = await Post.create(req.body);

  res.status(201).json({
    success: true,
    post,
  });
};

//Get all post
exports.getAllPost = async (req, res) => {
  const posts = await Post.find();
  res.status(201).json({
    success: true,
    posts,
  });
};

//Update Post

exports.updatePost = async (req, res, next) => {
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
};

//Detele post

exports.deletePost = async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(500).json({
      success: false,
      message: "Bài viết không tồn tại",
    });
  }

  await post.remove();
  res.status(200).json({ success: true, message: "Xóa bài viết thành công" });
};
