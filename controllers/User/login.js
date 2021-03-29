const connectDB = require('../../database/connectDB');
const ViewsCount = require('../../database/models/ViewsCount');
const State = require('../../database/models/State');

module.exports = async (req, res) => {
    connectDB.databaseConnection;
    if(req.session.language != 'bengali') {
        req.session.language = 'english';
    }
    const lastModified = await ViewsCount.find({postType: 'Blog Post', postLanguage: req.session.language}).sort({updatedAt: -1});
    const trending = await ViewsCount.find({postLanguage: req.session.language}).limit(6).sort({viewsCount: -1});
    const states = await State.find({});
    res.render('login', {
        danger: req.flash('danger'),
        lastModified,
        trending,
        states,
        dateTime: new Date().toDateString()
    })
}