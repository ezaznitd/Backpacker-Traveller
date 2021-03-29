const TravelPhotographyTips = require('../../database/models/TravelPhotographyTips');
const ViewsCount = require('../../database/models/ViewsCount');
const connectDB = require('../../database/connectDB');
const State = require('../../database/models/State');

module.exports = async (req, res) => {
    connectDB.databaseConnection;
    if(req.session.language != 'bengali') {
        req.session.language = 'english';
    }
    const travelPhotographyTips = await TravelPhotographyTips.findById(req.params.id);
    const posts = await ViewsCount.find({postType: 'Blog Post'}).sort({createdAt: -1});
    const lastModified = await ViewsCount.find({postType: 'Blog Post', postLanguage: req.session.language}).sort({updatedAt: -1});
    const trending = await ViewsCount.find({postLanguage: req.session.language}).limit(6).sort({viewsCount: -1});
    const states = await State.find({});
    res.render("travelPhotographyTips", {
        success: req.flash('success'),
        warning: req.flash('warning'),
        info: req.flash('info'),
        travelPhotographyTips,
        posts,
        trending,
        lastModified,
        id: req.params.id,
        states,
        dateTime: new Date().toDateString()
    });
}