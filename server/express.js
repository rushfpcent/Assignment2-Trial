//require module
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const compress = require('compression')
const cors = require('cors')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const assetsRouter = require('./asset-router')
const app = express()

//Server static file
app.use("/",express.static(path.join(__dirname,"public")))
app.use("/src",assetsRouter);

//API endpoint
app.get('/api/v1', function (req, res) {
    res.json({
        project:"React Project",
        from:"COMP229"
    });
});

//Extract routes from React/Client
app.get('/*', function (req,res) {
    res.sendFile(path.join(__dirname,"../public/","index.html"))
});

app.get('/about', function (req, res) {
    res.send('This is about me.')
});

app.get('/home', function (req, res) {
    res.send('{"message":"Welcome to DressStore application."} - Soroush Fazel-Pour')
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(cors())

module.exports = app;