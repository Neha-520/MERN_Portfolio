const dotenv = require("dotenv");
const mongoose = require('mongoose');
const express = require('express');
const app = express();
var cookieParser = require('cookie-parser')

app.use(cookieParser());

dotenv.config({ path: "./config.env" });
//hv to write only in app.js


require('./db/conn');
// const User = require('./model/userSchema');

app.use(express.json());

//router file linked
app.use(require('./router/auth'));

const PORT = process.env.PORT || 5000;


//MiddleWare
// const middleware = (req, res, next) => {
//     console.log("hello my middleware");
//     // next();
// }

// middleware();


// app.get('/about', (req, res) => {
//     res.send("hello from about");
// })


// app.get('/contact', (req, res) => {
//     res.send("hello from contact");
// })
app.get('/signin', (req, res) => {
    res.send("hello from login");
})
app.get('/signup', (req, res) => {
    res.send("hello from registeration");
})

//heroku
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

app.listen(PORT, () => {
    console.log(`server is running at port ${PORT}`);
})
