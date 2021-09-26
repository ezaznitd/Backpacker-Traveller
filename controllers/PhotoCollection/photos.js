const connectDB = require('../../database/connectDB');
const State = require('../../database/models/State');
const Photo = require('../../database/models/PhotoCollection');
const ViewsCount = require('../../database/models/ViewsCount');

module.exports = async (req, res) => {
    connectDB.databaseConnection;
    const states = await State.find({});
    const photos = await Photo.find({});
    const lastModified = await ViewsCount.find({postLanguage: req.session.language}).limit(6).sort({updatedAt: -1});
    res.render('photos', {
        states,
        dateTime: new Date().toDateString(),
        photos,
        lastModified
    });
}