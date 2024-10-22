const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.port || 5000,
    jwtSecret: process.env.JWT_Secret || "YOUR_secret_key",
    mongoUri: process.env.MONGODB_URI || 
    "mongodb+srv://sfazelpo:COMP229Pass@cluster0.jryvw.mongodb.net/Skeleton" || 
    process.env.MONGO_HOST || 
    'mongodb://' + (process.env.IP || 'localhost') + ':' + 
    (process.env.MONGO_PORT || '27017') + '/Skeleton'
};
module.exports = config;

// Model --> schema --> Database
// View --> HTML Page
// Controller --> router, controller