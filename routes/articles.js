// IMPORT EXPRESS ROUTER

const router = require('express').Router();


// IMPORT MODEL

const Article = require('../models/article')


// CREATE A ROUTERS

router.post('/', async (req,res)=> {

    // DESTRUCTURING THE OBJECT TO REDUCE CODE

    const {title, body, author } = req.body;


    // console.log(req.body)

    
    // LOGIC HERE TO STORE INTO THE DATABASE

    const article = new Article ({
        title,          // : req.body.title, KEY VALUE SAME
        body,           // : req.body.body,
        author         // : req.body.author
    })

    // TO SAVE THIS FIRST WAY

    // article.save((err, document)=> {
    //     if(err) {
    //         throw err
    //     }
    //     else {
    //         res.status(201).json(document)
    //     }
    // })


    // THIS IS SECOND WAY


    // article.save().then((document)=> {

    //     res.status(201).json(document)

    // }).catch(err => {
    //     throw err
    // })


    // MAKE ASYNC TO FUNCTION TO USE THIS THIRD WAY

    try {
        const document = await article.save()

        return res.status(201).json(document)
    }
    catch(err) {

        throw err
    }


})


// TO CREATE A ROUTES FOR ARTICLES


// TO GET DYNAMIC VALUE I.E. ID USE /: NAME


router.get('/:id', (req,res)=> {
        const{id} = req.params   // DES OR STR .id; 

        Article.findOne({ _id : id }, (err, document)=> {
            if(err) {
                throw err

            }

            if(document) {
                return res.json(document)

            }

            else {
                return res.status(404).json({error : 'Article Not Found!'})

            }
        })
})


// TO CREATE A PATCH ROUTE UPDATE

router.patch('/:id',(req,res)=> {
    
    const {id} = req.params

    const {title, body, author } = req.body 

    Article.findOne({_id : id }, (err, document)=> {
        if(err) {
            throw err

        }

        if(document) {
            Article.updateOne({_id : id}, {

                title,
                body,
                author
            }).then(status => {

                return res.json(req.body)
            }).catch(err=> {

                throw err
            })

        }

        else {
            return res.status(404).json({error : 'Article Not Found!'})

        }
    })
})

// CREATE ROUTE FOR ALL LIST FETCH ALL ARTICLES

router.get('/', (req, res)=> {

    Article.find((err, articles)=> {
        if(err) {
            throw err
        }
        return res.json(articles)

    })
})


// TO CREATE DELETE REQUEST 

router.delete('/:_id',(req,res)=>{

    const { _id } = req.params 

        Article.deleteOne({_id }).then((status)=> {

            return res.json({id : _id})

        }).catch(err => {
            return res.status(500).json({error : 'Something Went Wrong!'})

        })
    
})


// TO EXPORT THIS ROUTER

module.exports = router;