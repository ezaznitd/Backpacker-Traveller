const State = require('../../database/models/State');
const connectDB = require('../../database/connectDB');

module.exports = async (req, res) => {
    connectDB.databaseConnection;
    const state = await State.findById(req.params.stateId);
    const states = await State.find({});
    res.render("updateState", {
        state,
        states,
        dateTime: new Date().toDateString()
    });
}