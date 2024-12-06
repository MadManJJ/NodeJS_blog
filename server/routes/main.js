const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Routes
//  GET
//  HOME
router.get('', async (req, res) => {
    try {
        const locals = {
            title: "NodeJS Blog",
            description: "Simple Blog created with Nodejs, Express & MongoDb."
        }
        let perPage = 3;
        let page = req.query.page || 1; // default is 1

        const data = await Post.aggregate([ {$sort: { createdAt: -1} } ]) // make the older data be at the top
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec();

        const count = await Post.countDocuments();
        const nextPage = parseInt(page) + 1;
        const hasNextPage = nextPage <= Math.ceil(count / perPage);
        let atLastPage = false;
        if(!hasNextPage){
            atLastPage = true;
        }
        
        res.render('index', { 
            locals, 
            data,
            current: page,
            nextPage: hasNextPage ? nextPage : null,
            atLastPage
        });
    } catch (error) {
        console.log(error);
    }
    
});



// Routes
//  GET
//  post :id
router.get('/post/:id', async (req, res) => {
    try {    
        
        let slug = req.params.id; // get the id

        const data = await Post.findById({_id: slug});
        const locals = {
            title: data.title, // title use in layout
            description: "Simple Blog created with Nodejs, Express & MongoDb."
        }         
        res.render('post',{locals,data});
    } catch (error) {
        console.log(error);
    }
});

// Routes
//  POST
//  Post - searchTerm
router.post('/search', async (req, res) => {
    const locals = {
        title: search, // title use in layout
        description: "Simple Blog created with Nodejs, Express & MongoDb."
    }     
    try {   
        let searchTerm = req.body.searchTerm;
        
        console.log(searchTerm);


        // const data = await Post.findById({_id: slug});        
        res.send(searchTerm);
    } catch (error) {
        console.log(error);
    }
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