//require module
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const compress = require('compression')
const cors = require('cors')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const assetsRouter = require('./asset-router')
const userRoutes = require('./routes/User')
const contactRoutes = require('./routes/Contact')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(cors())

//Server static file
app.use('/api/users', userRoutes);
app.use('/api/contacts', contactRoutes);
app.use("/",express.static(path.join(__dirname,"public")))
app.use("/src",assetsRouter);

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

module.exports = app;