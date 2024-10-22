const app = require('./express.js')
//config
const config = require('./config/config.js')
//mongoDB
const mongoose = require('mongoose')

mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUri,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>console.log("Database connected successfully"))
.catch(err => console.error(`Connection Failed: ${err.message}`))

app.listen(config.port,()=>{
    console.info(`Server started on the port ${config.port}`)
})