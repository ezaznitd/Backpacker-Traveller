const State = require('../../database/models/State');
const ViewsCount = require('../../database/models/ViewsCount');
const connectDB = require('../../database/connectDB');

module.exports = async (req, res) => {
    connectDB.databaseConnection;
    const states = await State.find({}).sort({createdAt: -1});
    const lastModified = await ViewsCount.find({postLanguage: req.session.language}).limit(6).sort({updatedAt: -1});
    const posts = await ViewsCount.find({postType: 'Blog Post', postLanguage: req.session.language}).sort({createdAt: -1});
    res.render('states', {
        states,
        posts,
        lastModified,
        dateTime: new Date().toDateString()
    });
}