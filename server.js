// IMPORT THE .ENV FILE IN THIS MAIN FILE AVILABEL IN ALL FILE

require('dotenv').config();

// IMPORT THE EXPRESS AND MAKING OBJECT AND MONGOOSE, 

const express = require('express');

const app =  express();

const mongoose = require('mongoose');

// FOR DEV AND DEPLOYMENT

const PORT = process.env.PORT || 3000;


// DATABASE CONNCECTION

const url = 'mongodb://localhost/node-api';

mongoose.connect(url ,
      { 
        useNewUrlParser : true,
        // useCreateIndex : true,
        useUnifiedTopology : true,
        // useFindAndModify : true
    
})

const connection = mongoose.connection;

connection.once('open', ()=> {
    console.log('Database connected!')

})
// .catch(err =>  {
//     console.log('Database Error!')
// })


// EXPRES MIDDLEWARE

app.use(express.json())


// ROUTES ALL AND USE

const articlesRoutes =  require('./routes/articles.js');

const registerRoutes = require('./routes/register.js');

const loginRoutes = require('./routes/login.js');

const userRoutes = require('./routes/user.js')

const refreshRoute = require('./routes/refresh')

const logoutRoutes = require('./routes/logout')



app.use('/api/articles', articlesRoutes);

app.use('/api/register', registerRoutes)

app.use('/api/login', loginRoutes);

app.use('/api/User',userRoutes);

app.use('/api/refresh', refreshRoute);

app.use('/api/logout', logoutRoutes)


// LISTENING ON THE PORT

app.listen(PORT, ()=> {
    console.log(`Listening on port ${PORT}`)
})