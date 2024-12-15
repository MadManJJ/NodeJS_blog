const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const User = require("../models/User");
const bcrypt = require("bcrypt"); // encrypt and decrypt password
const jwt = require("jsonwebtoken");

const adminLayout = "../views/layouts/admin";
const jwtSecret = process.env.JWT_SECRET;

// Check Login // middleware function
const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.userId = decoded.userId; // maybe we want to use the data of the user like const user = await User.findById(req.userId) then we can use it (i use it in the dashboard)
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

// GET
// Admin - Login Page
router.get("/admin", async (req, res) => {
  // run when we go to /admin via <a> or change url
  try {
    const locals = {
      title: "Admin",
      description: "Simple Blog created with NodeJs, Express & MongoDb.",
    };

    res.render("admin/index", { locals, layout: adminLayout });
  } catch (error) {
    console.log(error);
  }
});

// POST
// Admin - Check Login
router.post("/admin", async (req, res) => {
  // run when we submit a form
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials1" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password); // bcrypt is irreversible it just hash the new one and check it
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials2" });
    }
    const token = jwt.sign({ userId: user._id }, jwtSecret); // jwtSecret is like a key to encrypt and decrypt | we encrypt user._id // we create json token
    res.cookie("token", token, { httpOnly: true }); // cookie to save that we already login after we refresh the page // the name of the cookie is token
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
});

// GET
// Dashboard
router.get("/dashboard", authMiddleware, async (req, res) => {
  try {
    const locals = {
      title: "Admin",
      description: "Simple Blog created with NodeJs, Express & MongoDb.",
    };
    const user = await User.findById(req.userId); // Access userId from req from the authMiddleware when we attach it req.userId = decoded.userId; line 21
    const data = await Post.find();
    res.render("admin/dashboard", { user, data, locals, layout: adminLayout }); // Pass user data to template
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

// GET
// Admin - Create New post
router.get("/add-post", authMiddleware, async (req, res) => {
  try {
    const locals = {
      title: "Add Post",
      description: "Simple Blog created with NodeJs, Express & MongoDb.",
    };
    const data = await Post.find();
    res.render("admin/add-post", { data, locals }); // Pass user data to template
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

// POST
// Admin - Register
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);

    try {
      // User is another model (schema) like post
      const user = await User.create({ username, password: hashPassword });
      return res.status(201).json({ message: "User Created", user });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(409).json({ message: "User already in use" });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

// router.get("/admin", async (req, res) => {
//   try {
//     const locals = {
//       title: "Admin",
//       description: "Simple Blog created with NodeJs, Express & MongoDb.",
//     };

//     res.render("admin/index", { locals, layout: adminLayout });
//   } catch (error) {
//     console.log(error);
//   }
// });
