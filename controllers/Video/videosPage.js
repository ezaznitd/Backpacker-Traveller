const Video = require('../../database/models/Video');
const connectDB = require('../../database/connectDB');
const ViewsCount = require('../../database/models/ViewsCount');
const State = require('../../database/models/State');

module.exports = async (req, res) => {
    connectDB.databaseConnection;
    if(req.session.language != 'bengali') {
        req.session.language = 'english';
    }
    const reviews = await Video.find({postType: req.params.postType, postLanguage: req.session.language}).sort({createdAt: -1});
    const lastModified = await ViewsCount.find({postLanguage: req.session.language}).limit(6).sort({updatedAt: -1});
    const trending = await ViewsCount.find({postLanguage: req.session.language}).limit(5).sort({viewsCount: -1});
    const states = await State.find({});
    const NoOfPosts = await Video.find({postType: req.params.postType, postLanguage: req.session.language}).countDocuments();
    var pageCount = NoOfPosts / 4;
    res.render('reviews', {
        reviews,
        lastModified,
        trending,
        postType: req.params.postType,
        states,
        dateTime: new Date().toDateString(),
        pageCount: Math.ceil(pageCount),
        currPageNo: parseInt(req.params.currPageNo),
        prevPage: parseInt(req.params.currPageNo) - 1,
        nextPage: parseInt(req.params.currPageNo) + 1
    });
}