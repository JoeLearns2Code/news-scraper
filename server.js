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

// Routes

app.get("/scrape", function (req, res) {
    axios.get("https://www.allsides.com/unbiased-balanced-news").then(function (response) {
        var $ = cheerio.load(response.data)
        //Create an object with headline, summary, and link to the article
        $(".story-title-description").each(function(i, element) {
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
            .then(function(dbArticle) {
                console.log(dbArticle);
            })
            .catch(function(err) {
                console.log(err);
            });
        });

        //Send message to the client
        res.send("Scrape Complete");
    });
});



// Start the server
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});