var mongoose = require("mongoose");

//Reference to the Schema constructor
var Schema = mongoose.Schema;

//create new UserSchema object
var ArticleSchema = new Schema({

    headline: {
        type: String,
        required: true
    },

    summary: {
        type: String,
        required: true
    },

    link: {
        type: String,
        required: true
    },

    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    }
});

var Article = mongoose.model("Article", ArticleSchema);

//Export
module.exports = Article;