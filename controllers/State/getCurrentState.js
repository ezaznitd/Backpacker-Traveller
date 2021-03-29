const State = require('../../database/models/State');
const connectDB = require('../../database/connectDB');
const ViewsCount = require('../../database/models/ViewsCount');

module.exports = async (req, res) => {
    connectDB.databaseConnection;
    if(req.session.language != 'bengali') {
        req.session.language = 'english';
    }
    const state = await State.findById(req.params.stateId);
    const lastModified = await ViewsCount.find({postType: 'Blog Post', postLanguage: req.session.language}).sort({updatedAt: -1});
    const trending = await ViewsCount.find({postLanguage: req.session.language}).limit(6).sort({viewsCount: -1});
    const states = await State.find({});
    res.render("updateState", {
        state,
        lastModified,
        trending,
        states,
        dateTime: new Date().toDateString()
    });
}