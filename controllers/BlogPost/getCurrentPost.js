const connectDB = require('../../database/connectDB');
const ViewsCount = require('../../database/models/ViewsCount');
const State = require('../../database/models/State');

module.exports = async (req, res) => {
    connectDB.databaseConnection;
    const post = await ViewsCount.findById(req.params.id);
    const states = await State.find({});
    res.render("update", {
        success: req.flash('success'),
        warning: req.flash('warning'),
        info: req.flash('info'),
        danger: req.flash('danger'),
        post,
        states,
        dateTime: new Date().toDateString()
    });
}