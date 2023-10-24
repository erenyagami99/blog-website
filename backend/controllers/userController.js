const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const multer = require("multer");
const path = require("path");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

const registerUser = asyncHandler(async (req, res) => {
  console.log("srinivas");
  const { name, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Enter all the fields");
  }
  try {
    let profilePicture;
    if (req.file) {
      profilePicture = req.file.path;
    }
    const user = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
      profilePicture: profilePicture,
    });

    const { _id } = await user.toJSON();

    const token = jwt.sign({ _id: _id }, process.env.SECRET_KEY);

    res.status(200).json({ user, token });
    console.log(user, "user");
  } catch (error) {
    if (error.message.includes("E11000")) {
      res.status(400).json({ message: "Email Already Exists" });
    }
    res.status(400).json({ message: error.message });
  }
});

const uploadMiddleware = upload.single("profilePicture");

const loginUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).send({
      message: "User not Found",
    });
  }

  if (!(await bcrypt.compare(req.body.password, user.password))) {
    return res.status(400).send({
      message: "Password is Incorrect",
    });
  }

  const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);

  res.status(200).json({ token });
  console.log(token, "token");
});

const currentUser = asyncHandler(async (req, res) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const decodedToken = jwt.verify(
      token.split(" ")[1],
      process.env.SECRET_KEY
    );

    if (!decodedToken) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const user = await User.findOne({ _id: decodedToken._id });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const { password, ...data } = await user.toJSON();

    res.status(200).json(data);
  } catch (err) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
});

module.exports = { registerUser, uploadMiddleware, currentUser, loginUser };
