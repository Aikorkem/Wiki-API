const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//set up MongoDB
mongoose.connect('mongodb://localhost:27017/wikiDB');
const Article = mongoose.model("Article", {title: String, content: String});


/////////////////////////////////////////Requests Targeting All Articles////////////////////////////////////////////////////

app.route("/articles")

    .get((req,res) => {
        Article.find({}, function(error, results){
            if(error){
                res.send(error);
            }else{
                res.send(results);
            }
        });
    })
    .post((req,res) => {
        const article = new Article({
            title: req.body.title,
            content: req.body.content
        });
    
        article.save();
        res.redirect("/articles");
    })
    .delete((req,res) => {
        Article.deleteMany({}, function(error){
            if(error){
                res.send(error);
            }else{
                res.send("All articles are deleted");
            }
        });
    });


    

// //get method
// app.get("/articles", function(req,res){
//     Article.find({}, function(error, results){
//         if(error){
//             res.send(error);
//         }else{
//             res.send(results);
//         }
//     });
// });

// //post method
// app.post("/articles", function(req,res){

//     const article = new Article({
//         title: req.body.title,
//         content: req.body.content
//     });

//     article.save();
//     res.redirect("/articles");
// });

// //delete method
// app.delete("/articles", function(req,res){
    
//     Article.deleteMany({}, function(error){
//         if(error){
//             res.send(error);
//         }else{
//             res.send("All articles are deleted");
//         }
//     });

// });

/////////////////////////////////////////Requests Targeting All Articles////////////////////////////////////////////////////

app.route("/articles/:articleTitle")
    .get((req,res) => {
        //const artTitle = _.lowerCase(req.params.articleTitle);
        const artTitle = req.params.articleTitle;
        Article.findOne({title: artTitle}, function(error, results){
            if(error){
                res.send(error);
            }else{
                res.send(results);
            }
        });
    })

    .put((req,res) => {
        const artTitle = req.params.articleTitle;
        Article.findOneAndUpdate({title: artTitle}, {
            title: req.body.title,
            content: req.body.content
        },{overwrite: true},
        function(error){
            if(error){
                res.send(error);
            }else{
                res.send("Success");
            }
        });
    })

    .patch((req,res) => {
        const artTitle = req.params.articleTitle;
        Article.updateOne({title: artTitle}, req.body,
        function(error){
            if(error){
                res.send(error);
            }else{
                res.send("Success");
            }
        });
    })

    .delete((req,res) => {
        const artTitle = req.params.articleTitle;
        Article.deleteOne({title: artTitle}, function(error){
            if(error){
                res.send(error);
            }else{
                res.send("Success");
            }
        });
    });


app.listen(3000, function(){
    console.log("Success");
});