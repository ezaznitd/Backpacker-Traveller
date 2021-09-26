const connectDB = require('../../database/connectDB');
const State = require('../../database/models/State');

module.exports = async (req, res) => {
    connectDB.databaseConnection;
    const states = await State.find({});
    res.render('about-developer', {
        states,
        dateTime: new Date().toDateString()
    });
};