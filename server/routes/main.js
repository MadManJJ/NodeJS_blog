const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

// Routes
//  GET
//  HOME
router.get("", async (req, res) => {
  try {
    const locals = {
      title: "Blog",
      description: "Simple Blog created with Nodejs, Express & MongoDb.",
    };
    const token = req.cookies.token;
    let logged = false;
    if (token) {
      logged = true;
    }
    let perPage = 10;
    let page = req.query.page || 1; // default is 1

    const data = await Post.aggregate([{ $sort: { createdAt: -1 } }]) // make the older data be at the top
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();

    const count = await Post.countDocuments();
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);
    let atLastPage = false;
    if (!hasNextPage) {
      atLastPage = true;
    }

    res.render("index", {
      locals,
      data,
      current: page,
      nextPage: hasNextPage ? nextPage : null,
      atLastPage,
      currentRoute: "/",
      logged,
    });
  } catch (error) {
    console.log(error);
  }
});

// Routes
//  GET
//  post :id
router.get("/post/:id", async (req, res) => {
  try {
    let slug = req.params.id; // get the id
    const token = req.cookies.token;
    let logged = false;
    if (token) {
      logged = true;
    }
    const data = await Post.findById({ _id: slug });
    const locals = {
      title: data.title, // title use in layout
      description: "Simple Blog created with Nodejs, Express & MongoDb.",
    };
    res.render("post", { locals, data, currentRoute: `/post/${slug}`, logged });
  } catch (error) {
    console.log(error);
  }
});

// Routes
//  POST
//  Post - searchTerm
router.post("/search", async (req, res) => {
  const locals = {
    title: "Search", // title use in layout
    description: "Simple Blog created with Nodejs, Express & MongoDb.",
  };
  const token = req.cookies.token;
  let logged = false;
  if (token) {
    logged = true;
  }
  try {
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const data = await Post.find({
      $or: [
        { title: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        { body: { $regex: new RegExp(searchNoSpecialChar, "i") } },
      ],
    });
    let haveData = data.length > 0;

    res.render("search", {
      data,
      locals,
      currentRoute: "/search",
      haveData,
      logged,
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/about", (req, res) => {
  const token = req.cookies.token;
  let logged = false;
  if (token) {
    logged = true;
  }
  res.render("about", {
    currentRoute: "/about",
    logged,
  }); //index.ejs
});

router.get("/contact", (req, res) => {
  const token = req.cookies.token;
  let logged = false;
  if (token) {
    logged = true;
  }
  res.render("contact", {
    currentRoute: "/contact",
    logged,
  }); //index.ejs
});

module.exports = router;

// function insertPostData (){
//     Post.insertMany([
//         {
//             title: "Building a Blog1",
//             body: "This is the body text1"
//         },
//         {
//             title: "Building a Blog2",
//             body: "This is the body text2"
//         }
//     ])
// }

// insertPostData();

// function insertPostData() {
//   Post.insertMany([
//     {
//       title: "Building APIs with Node.js",
//       body: "Learn how to use Node.js to build RESTful APIs using frameworks like Express.js",
//     },
//     {
//       title: "Deployment of Node.js applications",
//       body: "Understand the different ways to deploy your Node.js applications, including on-premises, cloud, and container environments...",
//     },
//     {
//       title: "Authentication and Authorization in Node.js",
//       body: "Learn how to add authentication and authorization to your Node.js web applications using Passport.js or other authentication libraries.",
//     },
//     {
//       title: "Understand how to work with MongoDB and Mongoose",
//       body: "Understand how to work with MongoDB and Mongoose, an Object Data Modeling (ODM) library, in Node.js applications.",
//     },
//     {
//       title: "build real-time, event-driven applications in Node.js",
//       body: "Socket.io: Learn how to use Socket.io to build real-time, event-driven applications in Node.js.",
//     },
//     {
//       title: "Discover how to use Express.js",
//       body: "Discover how to use Express.js, a popular Node.js web framework, to build web applications.",
//     },
//     {
//       title: "Asynchronous Programming with Node.js",
//       body: "Asynchronous Programming with Node.js: Explore the asynchronous nature of Node.js and how it allows for non-blocking I/O operations.",
//     },
//     {
//       title: "Learn the basics of Node.js and its architecture",
//       body: "Learn the basics of Node.js and its architecture, how it works, and why it is popular among developers.",
//     },
//     {
//       title: "NodeJs Limiting Network Traffic",
//       body: "Learn how to limit netowrk traffic.",
//     },
//     {
//       title: "Learn Morgan - HTTP Request logger for NodeJs",
//       body: "Learn Morgan.",
//     },
//   ]);
// }

// insertPostData();
