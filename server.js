//NPM Dependencies
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

//Scraping Tools
const axios = require("axios");
const cheerio = require("cheerio");

// Require all models
const db = require("./models");


const PORT = process.env.PORT || 3000;

//Initialize Express
const app = express();

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
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);



//Handlebars
const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// ROUTES //

//Route for index.handlebars as main page

app.get("/", (req, res) => {
    res.render("index");
})

app.get("/scrape", function (req, res) {
    axios.get("https://quillette.com").then(function (response) {
        const $ = cheerio.load(response.data)
        //Create an object with headline, summary, and link to the article
        $("h3.entry-title, h2.entry-title").each(function (i, element) {
            //Empty object for results
            const result = {};
            //h2's contain the title
            result.headline = $(this)
                .text();

            //p contains the story summary
            result.summary = $(this)
                .siblings("p.summary")
                .text();

            result.link = $(this)
                .children("a")
                .attr("href");
            // console.log(result);
            // console.log()
            // console
            //Create new article list using the result object
            db.Article.create(result)
                .then(function (dbArticle) {
                    //console.log(dbArticle);
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

//TODO: Route for clearing articles
app.get("/articles/:id", function(req, res) {
    db.Article.remove(function(err) {
        if(err) {
            res.send(err)
        }
    });
});


//Route for grabbing a specific Article by id and populating it with any affiliated notes
app.get("/articles/:id", function(req, res) {
    db.Article.findOne({_id:req.params.id})
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


//Route for deleting Note
app.delete("/articles/:id", function(req, res) {
    db.Note.remove()
    .then(function(dbNote) {
      res.json(dbNote);
    })
    .catch(function(err) {
        res.json(err);
    })
});



// Start the server
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});