const Video = require('../../database/models/Video');
const connectDB = require('../../database/connectDB');
const State = require('../../database/models/State');

module.exports = async (req, res) => {
    connectDB.databaseConnection;
    if(req.session.language != 'bengali') {
        req.session.language = 'english';
    }
    const review = await Video.findById(req.params.id);
    const states = await State.find({});
    res.render("updateReview", {
        success: req.flash('success'),
        warning: req.flash('warning'),
        info: req.flash('info'),
        danger: req.flash('danger'),
        review,
        states,
        dateTime: new Date().toDateString()
    });
}