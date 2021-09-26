const TravelPhotographyTips = require('../../database/models/TravelPhotographyTips');
const connectDB = require('../../database/connectDB');
const State = require('../../database/models/State');
const ViewsCount = require('../../database/models/ViewsCount');

module.exports = async (req, res) => {
    connectDB.databaseConnection;
    const travelPhotographyTips = await TravelPhotographyTips.findById(req.params.id);
    const lastModified = await ViewsCount.find({postLanguage: req.session.language}).limit(6).sort({updatedAt: -1});
    const trending = await ViewsCount.find({postLanguage: req.session.language}).limit(5).sort({viewsCount: -1});
    const states = await State.find({});
    res.render("travelPhotographyTips", {
        success: req.flash('success'),
        warning: req.flash('warning'),
        info: req.flash('info'),
        travelPhotographyTips,
        id: req.params.id,
        states,
        lastModified,
        trending,
        dateTime: new Date().toDateString()
    });
}