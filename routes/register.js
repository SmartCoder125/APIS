// IMPORT THE ROUTES 

const router = require('express').Router();

// IMPORT THE MODEL USER

const User = require('../models/user.js')

// IMPORT BCRYPT LIBRERY

const bcrypt = require('bcrypt')

// IMPORT THE JSON WEB TOKEN

const jwt = require('jsonwebtoken')

// IMPORT THE REFRESH TOKEN

const Refresh = require('../models/refresh.js')



// CREATE A ROUTES OF POST CREATE A USER

router.post('/', (req, res)=> {

    // FIRST AUTHORISE THE REQUEST -- 



    // VALIDATE -- /////////////////

    const {name ,email, password} = req.body

    // if(req.body.email || req.body.password || req.body.name) {

    // }

    if(!name || !email || !password) {
            return res.status(422).json({error : 'All Fields Are Required!'})

    }


    // CHEAK IF USER EXIST! --

    User.exists({email : email}, async (err, result)=> {

        if(err) {
            return res.status(500).json({error : 'Something Wents Wrong!'})
            
        }

        if(result) {
            return res.json(422).json({error : 'User With This Email Already Exist!'})

        }

        else {

                // HASH PASSWORD WITH BCRYPT

                const hashPassword = await bcrypt.hash(password, 10);


                const user =  new User ({

                    name : name,
                    email : email,
                    password : hashPassword
                })


                user.save().then(user => {
                    
                    // JWT TOKENS

                    const accessToken = jwt.sign({
                        id : user._id,
                        name : user.name,
                        email : user.email
                    }, process.env.JWT_TOKEN_SECRET, { expiresIn : '30s' } )


                    // REFRESH TOKEN

                    const refreshToken = jwt.sign({
                        id : user._id,
                        name : user.name,
                        email : user.email
                    }, process.env.JWT_REFRESH_TOKEN )

                    
                    
                    
                    new Refresh({

                            token : refreshToken


                    }).save().then(() => {
                        return res.send({
                            accessToken : accessToken,
                            refreshToken : refreshToken,
                            type : 'Bearer'
    
                        })

                    })


                    
                     // AFTER ACCESS TOKEN SEND A RESPONCE

                    //  return res.send({
                    //     accessToken : accessToken,
                    //     refreshToken : refreshToken,
                    //     type : 'Bearer'

                    // })

                    
            
                }).catch(err => {
                    return res.status(500).send({error : 'Something Went Wrong!'})
                })

        }

    })


})

// TO EXPORT THIS MAIN MODULE

module.exports = router;