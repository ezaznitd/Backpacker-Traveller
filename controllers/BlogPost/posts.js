const connectDB = require('../../database/connectDB');
const ViewsCount = require('../../database/models/ViewsCount');
const State = require('../../database/models/State');

module.exports = async (req, res) => {
    connectDB.databaseConnection;
    if(req.session.language != 'bengali') {
        req.session.language = 'english';
    }
    const posts = await ViewsCount.find({postType: req.params.postType, postLanguage: req.session.language}).sort({createdAt: -1});
    const states = await State.find({});
    const NoOfPosts = await ViewsCount.find({postType: req.params.postType, postLanguage: req.session.language}).countDocuments();
    var pageCount = NoOfPosts / 4;
    res.render('posts', {
        posts,
        postType: req.params.postType,
        states,
        dateTime: new Date().toDateString(),
        pageCount: Math.ceil(pageCount),
        currPageNo: 1,
        prevPage: 0,
        nextPage: 2
    });
}