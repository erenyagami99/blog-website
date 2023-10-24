const { Router } = require("express");

const {
  registerUser,
  uploadMiddleware,
  currentUser,
  loginUser,
} = require("../controllers/userController");

const {
  createBlog,
  getBlogs,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");

const router = Router();

router.post("/register", uploadMiddleware, registerUser);

router.post("/login", loginUser);

router.get("/user", currentUser);

router.post("/create-blog", createBlog);
router.get("/get-blogs", getBlogs);
router.patch("/update-blog/:id", updateBlog);
router.delete("/delete-blog/:id", deleteBlog);

module.exports = router;
