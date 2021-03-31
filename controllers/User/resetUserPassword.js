const connectDB = require('../../database/connectDB');
const State = require('../../database/models/State');

module.exports = async (req, res) => {
    connectDB.databaseConnection;
    const states = await State.find({});
    res.render('resetPassword', {
        states,
        danger: req.flash('danger'),
        dateTime: new Date().toDateString()
    })
}