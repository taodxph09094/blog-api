const mongoose = require("mongoose");

const subSchema = mongoose.Schema({
  email: {
    type: String,
    require: [true, "Vui lòng nhập email của bạn"],
    trim: true,
  },
  name: {
    type: String,
    require: [true, "Vui lòng nhập tên của bạn"],
  },
  status: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Sub", subSchema);
