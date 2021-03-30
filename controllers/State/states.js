const State = require('../../database/models/State');
const connectDB = require('../../database/connectDB');

module.exports = async (req, res) => {
    connectDB.databaseConnection;
    const states = await State.find({}).sort({createdAt: -1});
    res.render('states', {
        states,
        dateTime: new Date().toDateString()
    });
}