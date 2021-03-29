const Location = require('../../database/models/Location');
const connectDB = require('../../database/connectDB');
const ViewsCount = require('../../database/models/ViewsCount');
const State = require('../../database/models/State');

module.exports = async (req, res) => {
    connectDB.databaseConnection;
    if(req.session.language != 'bengali') {
        req.session.language = 'english';
    }
    const location = await Location.findById(req.params.locationId);
    const lastModified = await ViewsCount.find({postType: 'Blog Post', postLanguage: req.session.language}).sort({updatedAt: -1});
    const trending = await ViewsCount.find({postLanguage: req.session.language}).limit(6).sort({viewsCount: -1});
    const states = await State.find({});
    res.render("updateLocation", {
        location,
        lastModified,
        trending,
        stateName: req.params.stateName,
        locationName: req.params.locationName,
        states,
        dateTime: new Date().toDateString()
    });
}