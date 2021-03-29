const State = require('../../database/models/State');
const connectDB = require('../../database/connectDB');
const ViewsCount = require('../../database/models/ViewsCount');

module.exports = async (req, res) => {
    connectDB.databaseConnection;
    if(req.session.language != 'bengali') {
        req.session.language = 'english';
    }
    const states = await State.find({}).sort({createdAt: -1});
    const trending = await ViewsCount.find({postLanguage: req.session.language}).limit(6).sort({viewsCount: -1});
    const posts = await ViewsCount.find({postType: 'Blog Post', postLanguage: req.session.language}).sort({createdAt: -1});
    const lastModified = await ViewsCount.find({postType: 'Blog Post', postLanguage: req.session.language}).sort({updatedAt: -1});
    res.render('states', {
        states,
        posts,
        lastModified,
        trending,
        dateTime: new Date().toDateString()
    });
}