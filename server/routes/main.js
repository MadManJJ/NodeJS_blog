const express = require('express');
const router = express.Router();

//Routes
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