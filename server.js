//NPM Dependencies
var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

//Scraping Tools
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");


var PORT = 3000;

//Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));


// Mongoose
// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);



//Handlebars
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// ROUTES //

app.get("/scrape", function (req, res) {
    axios.get("https://www.allsides.com/unbiased-balanced-news").then(function (response) {
        var $ = cheerio.load(response.data)
        //Create an object with headline, summary, and link to the article
        $(".story-title-description").each(function (i, element) {
            //Empty object for results
            var result = {};
            //h2's contain the title
            result.headline = $(this)
                .find("h2")
                .text();
            //p contains the story summary
            result.summary = $(this)
                .find("p")
                .text();
            //a href contains the link
            result.link = $(this)
                .find("a")
                .attr("href");

            //Create new article list using the result object
            db.Article.create(result)
                .then(function (dbArticle) {
                    console.log(dbArticle);
                })
                .catch(function (err) {
                    console.log(err);
                });
        });

        //Send message to the client
        res.send("Scrape Complete");
        res.json(dbArticle);
    });
});


//Route for getting all articles
app.get("/articles", function (req, res) {
    db.Article.find({})
        .then(function (article) {
            res.json(article);
        })
        .catch(function (err) {
            res.json(err);
        })
});

//TODO: Route for clearing all articles


//Route for grabbing a specific Article by id and populating it with any affiliated notes
app.get("/articles/:id", function(req, res) {
    db.Article.find({_id:req.params.id})
    .populate("note")
    .then(function(article) {
        res.json(article);
    })
    .catch(function(err) {
        res.json(err);
    })
});

//TODO: Route for getting all saved articles


//TODO: Route for deleting a saved article


//Route for saving and updating Note
app.post("/articles/:id", function(req, res) {
    db.Note.create(req.body)
  .then(function(dbNote){
    return db.Article.findOneAndUpdate({_id: req.params.id}, {note:dbNote._id}, {new:true})
    .then(function(dbArticle) {
      res.json(dbArticle);

    })
  })
  .catch(function(err){
    res.json(err);
  })
});


//TODO: Route for deleting Note
app.post("/articles/:id", function(req, res) {
    db.Note.destroy(req.body)
    .then(function(dbNote) {
        return db.Article.findOneAndRemove({_id: req.params.id}, {note:dbNote._id})
        .then(function(dbArticle) {
            res.json(dbArticle);
        })
    })
    .catch(function(err) {
        res.json(err);
    })
});



// Start the server
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});