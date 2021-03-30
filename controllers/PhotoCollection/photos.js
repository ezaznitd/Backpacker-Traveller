const connectDB = require('../../database/connectDB');
const State = require('../../database/models/State');
const Photo = require('../../database/models/PhotoCollection');

module.exports = async (req, res) => {
    connectDB.databaseConnection;
    const states = await State.find({});
    const photos = await Photo.find({});
    res.render('photos', {
        states,
        dateTime: new Date().toDateString(),
        photos
    });
}