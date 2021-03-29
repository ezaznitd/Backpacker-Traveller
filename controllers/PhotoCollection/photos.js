const connectDB = require('../../database/connectDB');
const ViewsCount = require('../../database/models/ViewsCount');
const State = require('../../database/models/State');
const Photo = require('../../database/models/PhotoCollection');

module.exports = async (req, res) => {
    connectDB.databaseConnection;
    if(req.session.language != 'bengali') {
        req.session.language = 'english';
    }
    const lastModified = await ViewsCount.find({postType: req.params.postType, postLanguage: req.session.language}).sort({updatedAt: -1});
    const trending = await ViewsCount.find({postLanguage: req.session.language}).limit(6).sort({viewsCount: -1});
    const states = await State.find({});
    const photos = await Photo.find({});
    res.render('photos', {
        lastModified,
        trending,
        states,
        dateTime: new Date().toDateString(),
        photos
    });
}