const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require("express");
const app = express();

dotenv.config({path : './config.env'});
require('./db/conn');


app.use(express.json());

app.use(require('./router/auth'));

const PORT = process.env.PORT;


//Middleware
const middleware = (req, res, next) => {
     
     next();
}


app.listen(PORT, () => {
  // perform a database connection when server starts
    console.log(`Server is running on port: ${PORT}`);
});

