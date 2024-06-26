const TravelPost = require('../../database/models/TravelPosts');
const ViewsCount = require('../../database/models/ViewsCount');
const connectDB = require('../../database/connectDB');
const State = require('../../database/models/State');

module.exports = async (req, res) => {
    connectDB.databaseConnection;
    if(req.session.language != 'bengali') {
        req.session.language = 'english';
    }
    const travelPost = await TravelPost.findById(req.params.postId);
    const lastModified = await ViewsCount.find({postLanguage: req.session.language}).limit(6).sort({updatedAt: -1});
    const trending = await ViewsCount.find({postLanguage: req.session.language}).limit(5).sort({viewsCount: -1});
    const states = await State.find({});
    res.render("travelPost", {
        success: req.flash('success'),
        warning: req.flash('warning'),
        info: req.flash('info'),
        danger: req.flash('danger'),
        travelPost,
        lastModified,
        trending,
        stateName: req.params.stateName,
        locationName: req.params.locationName,
        states,
        dateTime: new Date().toDateString()
    });
}