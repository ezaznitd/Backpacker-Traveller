const ViewsCount = require('../../database/models/ViewsCount');
const Video = require('../../database/models/Video');
const connectDB = require('../../database/connectDB');
const State = require('../../database/models/State');

module.exports = async (req, res) => {
    connectDB.databaseConnection;
    if(req.session.language != 'bengali') {
        req.session.language = 'english';
    }
    const posts = await ViewsCount.find({postType: 'Blog Post', postLanguage: req.session.language}).sort({createdAt: -1});
    const travelVideo = await Video.find({postType: 'Travel Video', postLanguage: req.session.language}).limit(6).sort({createdAt: -1});
    const lastModified = await ViewsCount.find({postType: 'Blog Post', postLanguage: req.session.language}).sort({updatedAt: -1});
    const trending = await ViewsCount.find({postLanguage: req.session.language}).limit(6).sort({viewsCount: -1});
    const travelStories = await ViewsCount.find({postType: 'Travel Story', postLanguage: req.session.language}).sort({createdAt: -1});
    const travelTips = await ViewsCount.find({postType: 'Travel Tip', postLanguage: req.session.language}).sort({createdAt: -1});
    const states = await State.find({});
    res.render("index", {
        success: req.flash('success'),
        warning: req.flash('warning'),
        info: req.flash('info'),
        danger: req.flash('danger'),
        posts,
        travelStories,
        travelTips,
        trending,
        lastModified,
        travelVideo,
        states,
        dateTime: new Date().toDateString()
    });
}