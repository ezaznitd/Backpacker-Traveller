const connectDB = require('../../database/connectDB');
const ViewsCount = require('../../database/models/ViewsCount');
const State = require('../../database/models/State');

module.exports = async (req, res) => {
    connectDB.databaseConnection;
    if(req.session.language != 'bengali') {
        req.session.language = 'english';
    }
    const post = await ViewsCount.findById(req.params.id);
    const lastModified = await ViewsCount.find({postType: req.params.postType, postLanguage: req.session.language}).sort({updatedAt: -1});
    const trending = await ViewsCount.find({postLanguage: req.session.language}).limit(6).sort({viewsCount: -1});
    const states = await State.find({});
    res.render("update", {
        success: req.flash('success'),
        warning: req.flash('warning'),
        info: req.flash('info'),
        danger: req.flash('danger'),
        post,
        lastModified,
        trending,
        states,
        dateTime: new Date().toDateString()
    });
}