const connectDB = require('../../database/connectDB');
const State = require('../../database/models/State');
const Photo = require('../../database/models/PhotoCollection');

module.exports = async (req, res) => {
    connectDB.databaseConnection;
    const photo = await Photo.findById(req.params.id);
    const states = await State.find({});
    res.render("updatePhoto", {
        success: req.flash('success'),
        warning: req.flash('warning'),
        info: req.flash('info'),
        states,
        dateTime: new Date().toDateString(),
        photo
    });
}