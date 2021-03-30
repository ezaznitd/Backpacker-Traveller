const Video = require('../../database/models/Video');
const ViewsCount = require('../../database/models/ViewsCount');
const connectDB = require('../../database/connectDB');
const State = require('../../database/models/State');

module.exports = async (req, res) => {
    connectDB.databaseConnection;
    if(req.session.language != 'bengali') {
        req.session.language = 'english';
    }
    const review = await Video.findById(req.params.id);
    const posts = await ViewsCount.find({postType: 'Blog Post', postLanguage: req.session.language}).sort({createdAt: -1});
    const states = await State.find({});
    res.render("review", {
        success: req.flash('success'),
        warning: req.flash('warning'),
        info: req.flash('info'),
        review,
        posts,
        id: req.params.id,
        states,
        dateTime: new Date().toDateString()
    });
}