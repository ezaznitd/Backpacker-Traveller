const TravelPhotographyTips = require('../../database/models/TravelPhotographyTips');
const connectDB = require('../../database/connectDB');
const State = require('../../database/models/State');

module.exports = async (req, res) => {
    connectDB.databaseConnection;
    const travelPhotographyTips = await TravelPhotographyTips.findById(req.params.id);
    const states = await State.find({});
    res.render("travelPhotographyTips", {
        success: req.flash('success'),
        warning: req.flash('warning'),
        info: req.flash('info'),
        travelPhotographyTips,
        id: req.params.id,
        states,
        dateTime: new Date().toDateString()
    });
}