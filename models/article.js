// IMPORT MONGOOSE

const mongoose = require('mongoose');

// IMPORT SCHEMA AND CONSTRUCTURE - IS BLUEPRINT OR STRUCTURE.

const Schema = mongoose.Schema;

const articleSchema = new Schema({
        title : { type : String , required : true},
        body : {type : String, required : true},
        author : {type : String, required  : true}
},{timestamps : true});


// MODEL

const Article = mongoose.model('Article', articleSchema)


// TO EXPORT THIS MODELS

module.exports = Article;