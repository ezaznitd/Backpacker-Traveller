const connectDB = require('../../database/connectDB');
const FAQ = require('../../database/models/FAQ');
const State = require('../../database/models/State');

module.exports = async (req, res) => {
    connectDB.databaseConnection;
    const faq = await FAQ.find({});
    const states = await State.find({});
    res.render('FAQ', {
        states,
        faq,
        dateTime: new Date().toDateString(),
    });
}