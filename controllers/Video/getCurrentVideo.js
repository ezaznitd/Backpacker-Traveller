const Video = require('../../database/models/Video');
const connectDB = require('../../database/connectDB');
const ViewsCount = require('../../database/models/ViewsCount');
const State = require('../../database/models/State');

module.exports = async (req, res) => {
    connectDB.databaseConnection;
    if(req.session.language != 'bengali') {
        req.session.language = 'english';
    }
    const review = await Video.findById(req.params.id);
    const lastModified = await ViewsCount.find({postType: 'Blog Post', postLanguage: req.session.language}).sort({updatedAt: -1});
    const trending = await ViewsCount.find({postLanguage: req.session.language}).limit(6).sort({viewsCount: -1});
    const states = await State.find({});
    res.render("updateReview", {
        success: req.flash('success'),
        warning: req.flash('warning'),
        info: req.flash('info'),
        danger: req.flash('danger'),
        review,
        lastModified,
        trending,
        states,
        dateTime: new Date().toDateString()
    });
}