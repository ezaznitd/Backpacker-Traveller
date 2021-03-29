const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

function databaseConnection () {
    const connectionParams={
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true 
    }
    mongoose.connect(process.env.ATLAS_URI,connectionParams)
        .then( () => {
            console.log('Connected to database ')
        })
        .catch( (err) => {
            console.error(`Error connecting to the database. \n${err}`);
        })
}

module.exports = databaseConnection;