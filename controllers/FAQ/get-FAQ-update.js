const connectDB = require('../../database/connectDB');
const FAQ = require('../../database/models/FAQ');
const State = require('../../database/models/State');
const User = require('../../database/models/User');

module.exports = async (req, res) => {
    connectDB.databaseConnection;
    const faq = await FAQ.find({question: req.body['question']});
    const states = await State.find({});
    const user = await User.find({});
    res.render('update-FAQ', {
        success: req.flash('success'),
        warning: req.flash('warning'),
        info: req.flash('info'),
        danger: req.flash('danger'),
        states,
        faq: faq[0],
        user,
        dateTime: new Date().toDateString(),
    });
}