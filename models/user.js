// IMPORT MONGOOSE CLIENT 

const mongoose = require('mongoose')

// IMPORT MONGOOSE SCHEMA

const Schema = mongoose.Schema;

// MAKE THE STRUCTURE OF THE SCHEMA

const userSchema = new Schema({

    name : {type : String, required : true},
    email : {type : String, required : true},
    password : {type : String, required : true}

},{
    timestamps : true
})

// MODEL OF THE SCHEMA

// mongoose.model('User', userSchema)  // USER NAME IS SINGULAR

                                    // COLLECTION WILL BE PLULAR


// EXPORTS THE MODULE GIVEN IN NODE JS EVERY FILE IS MODULE.


module.exports = mongoose.model('User', userSchema);