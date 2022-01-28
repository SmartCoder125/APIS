// TO IMPORT THIS

const router = require('express').Router();

const User = require('../models/user');

const auth = require('../middleware/auth.js');


// CREATE A ROUTE TO GET USERS

router.get('/', auth ,(req,res)=> {

    User.findOne({email : req.user.email }).select('-password').exec((err, user)=> {

            if(err) {
                throw err
            }

            res.send(user)
    })


})

// TO EXPORT THIS

module.exports = router;