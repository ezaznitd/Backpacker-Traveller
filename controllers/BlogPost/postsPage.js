const connectDB = require('../../database/connectDB');
const ViewsCount = require('../../database/models/ViewsCount');
const State = require('../../database/models/State');

module.exports = async (req, res) => {
    connectDB.databaseConnection;
    if(req.session.language != 'bengali') {
        req.session.language = 'english';
    }
    const posts = await ViewsCount.find({postType: req.params.postType, postLanguage: req.session.language}).sort({createdAt: -1}).skip(4 * (req.params.currPageNo - 1)).limit(4);
    const lastModified = await ViewsCount.find({postLanguage: req.session.language}).limit(6).sort({updatedAt: -1});
    const trending = await ViewsCount.find({postLanguage: req.session.language}).limit(5).sort({viewsCount: -1});
    const states = await State.find({});
    const NoOfPosts = await ViewsCount.find({postType: req.params.postType, postLanguage: req.session.language}).countDocuments();
    var pageCount = NoOfPosts / 4;
    res.render('posts', {
        posts,
        postType: req.params.postType,
        states,
        lastModified,
        trending,
        dateTime: new Date().toDateString(),
        pageCount: Math.ceil(pageCount),
        currPageNo: parseInt(req.params.currPageNo),
        prevPage: parseInt(req.params.currPageNo) - 1,
        nextPage: parseInt(req.params.currPageNo) + 1
    });
}