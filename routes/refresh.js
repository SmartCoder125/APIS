
const router = require('express').Router();

const User = require('../models/user');

const jwt = require('jsonwebtoken');

const Refresh = require('../models/refresh.js');


router.post('/', (req,res)=> {
    if(!req.body.token) {
        return res.status(401).json({error : 'Not Valid Token!'})
    }


    Refresh.findOne({ token : req.body.token }).then(document => {
        if(document) {
            jwt.verify(req.body.token, process.env.JWT_REFRESH_TOKEN, (err, user)=> {
                if(err) {
                    return res.sendStatus(403)
                }

                // / JWT TOKENS

                    const accessToken = jwt.sign({
                        id : user._id,
                        name : user.name,
                        email : user.email
                    }, process.env.JWT_TOKEN_SECRET, { expiresIn : '30s' } )


                    return res.json({ accessToken : accessToken, type : 'Bearer'})

            })
        }


        return res.status(401).json({error : 'Not Valid Token!!'})


    }).catch(err => {
        throw err
    })


})


// EXPORTS THIS 

module.exports = router;


