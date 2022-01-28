// FOR THE LOGIN FILE IMPORT THE ROUTER FIRST AND ALL 

const router = require('express').Router();

const User = require('../models/user.js');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');


// CREATE A ROUTER FOT THE POST TO LOGIN

router.post('/', (req,res)=> {

    // VALIDATE THE REQUEST

    const {name, email, password } = req.body;

    if(!email || !password) {

        return res.status(422).json({error : 'ALl Fields Are Required!!'})

    }


    // TO CALL THE USER

    User.findOne({email : email}, (err, user)=> {

        if(err) {
            throw err

        }

        if(user) {

            bcrypt.compare(password , user.password ).then((match)=> {
                    if(match) {
                        // JWT

                        const accessToken = jwt.sign({

                            id : user._id,
                            name : user.name,
                            email : user.email
                        }, process.env.JWT_TOKEN_SECRET,{ expiresIn : '30s' } )

                        // RESPONCE TO THE CLIENT

                        return res.send({
                            accessToken : accessToken,
                            type : 'Brarer'
                        })

                    }
                    else {
                        return res.status(401).json({error : 'Email and Paassword Does Not Match!!'})
                    }

            }).catch(err => {
                throw err
            })

        }

        else {
                return res.status(401).json({error : 'Email or Password is Wrong!!'})

        }
    })

})

// TO EXPORT THIS ROUTER

module.exports = router;