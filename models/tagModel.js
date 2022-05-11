const mongoose = require("mongoose");

const tagSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, "Vui lòng nhập tag"],
    trim: true,
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
module.exports = mongoose.model("Tag", tagSchema);
