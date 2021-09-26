const connectDB = require('../../database/connectDB');
const FAQ = require('../../database/models/FAQ');
const State = require('../../database/models/State');

module.exports = async (req, res) => {
    connectDB.databaseConnection;
    const faq = await FAQ.find({});
    const states = await State.find({});
    res.render('get-FAQ', {
        success: req.flash('success'),
        warning: req.flash('warning'),
        info: req.flash('info'),
        danger: req.flash('danger'),
        states,
        faq,
        dateTime: new Date().toDateString(),
    });
}