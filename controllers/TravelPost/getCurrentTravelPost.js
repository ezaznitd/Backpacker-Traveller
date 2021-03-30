const TravelPost = require('../../database/models/TravelPosts');
const connectDB = require('../../database/connectDB');
const State = require('../../database/models/State');

module.exports = async (req, res) => {
    connectDB.databaseConnection;
    const travelPost = await TravelPost.findById(req.params.postId);
    const states = await State.find({});
    res.render("updateTravelPost", {
        travelPost,
        stateName: req.params.stateName,
        locationName: req.params.locationName,
        states,
        dateTime: new Date().toDateString()
    });
}