const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: {
    type: String,
    require: [true, "Vui lòng nhập tiêu đề cho bài viết"],
    trim: true,
  },
  description: {
    type: String,
    require: [true, "Vui lòng nhập tóm tắt (mô tả) cho bài viết"],
  },
  content: {
    type: String,
    require: [true, "Vui lòng nhập nội dung bài viết"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    require: [true, "Vui lòng nhập danh mục cho bài viết"],
  },
  tags: {
    type: String,
    require: [true, "Vui lòng nhập tag cho bài viết"],
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "Guest",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
  // user: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: "Guest",
  //   required: true,
  // },
});

module.exports = mongoose.model("Post", postSchema);
