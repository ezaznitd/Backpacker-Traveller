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
    const posts = await ViewsCount.find({postType: 'Blog Post', postLanguage: req.session.language}).sort({createdAt: -1});
    const states = await State.find({});
    res.render("travelPost", {
        success: req.flash('success'),
        warning: req.flash('warning'),
        info: req.flash('info'),
        travelPost,
        posts,
        stateName: req.params.stateName,
        locationName: req.params.locationName,
        states,
        dateTime: new Date().toDateString()
    });
}