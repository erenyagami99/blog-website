const mongoose = require("mongoose");

const blogModel = mongoose.Schema(
  {
    heading: { type: String, required: true },
    description: { type: String, required: true },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    author: {
      type: {},
    },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model("Blog", blogModel);

module.exports = Blog;
