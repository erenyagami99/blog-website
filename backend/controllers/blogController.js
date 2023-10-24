const asyncHandler = require("express-async-handler");
const Blog = require("../models/blogModel");
const User = require("../models/userModel");

const createBlog = asyncHandler(async (req, res) => {
  const { heading, description, postedBy } = req.body;
  if (!heading || !description || !postedBy) {
    res.status(400);
    throw new Error("Please Enter all the fields");
  }
  try {
    const user = await User.findById(postedBy);
    if (!user) {
      res.status(400);
      throw new Error("User not found");
    }

    const blog = await Blog.create({
      heading,
      description,
      postedBy,
      author: user,
    });

    res.status(200).json(blog);
    console.log(blog, "blog");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getBlogs = asyncHandler(async (req, res) => {
  try {
    const data = await Blog.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const updateBlog = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await Blog.findByIdAndUpdate(id, updatedData, options);

    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const deleteBlog = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Blog.findByIdAndDelete(id);
    console.log(data, "data");
    res.send(`Document with title ${data.title} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = { createBlog, getBlogs, updateBlog, deleteBlog };
