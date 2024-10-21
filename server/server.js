//require module
const express = require('express')
const path = require('path')
const app = express()
const assetsRouter = require('./asset-router')

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

app.get('/', function (req, res) {
    res.send('{"message":"Welcome to DressStore application."} - Soroush Fazel-Pour')
});

app.listen(3000)
console.log('server is running on the port 3000')
