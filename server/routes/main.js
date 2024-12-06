const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Routes
//  GET
//  HOME
router.get('', (req, res) => {
    const locals = {
        title: "NodeJS Blog",
        description: "Simple Blog created with Nodejs, Express & MongoDb."
    }
    const x = "bob";
    
    res.render('index', { locals, x }); //index.ejs
});


router.get('/about', (req, res) => {
    res.render('about'); //index.ejs
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