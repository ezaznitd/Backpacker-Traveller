const TravelPhotographyTips = require('../../database/models/TravelPhotographyTips');
const connectDB = require('../../database/connectDB');
const State = require('../../database/models/State');

module.exports = async (req, res) => {
    connectDB.databaseConnection;
    const travelPhotographyTips = await TravelPhotographyTips.findById(req.params.id);
    const states = await State.find({});
    res.render("updateTravelPhotographyTips", {
        success: req.flash('success'),
        warning: req.flash('warning'),
        info: req.flash('info'),
        danger: req.flash('danger'),
        travelPhotographyTips,
        states,
        dateTime: new Date().toDateString()
    });
}