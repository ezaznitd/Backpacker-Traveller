const Location = require('../../database/models/Location');
const connectDB = require('../../database/connectDB');
const State = require('../../database/models/State');

module.exports = async (req, res) => {
    connectDB.databaseConnection;
    const location = await Location.findById(req.params.locationId);
    const states = await State.find({});
    res.render("updateLocation", {
        location,
        stateName: req.params.stateName,
        locationName: req.params.locationName,
        states,
        dateTime: new Date().toDateString()
    });
}