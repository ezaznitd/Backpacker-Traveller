const connectDB = require('../../database/connectDB');
const State = require('../../database/models/State');

module.exports = async (req, res) => {
    connectDB.databaseConnection;
    const states = await State.find({});
    console.log(req.params.token);
    res.render('newPassword', {
        states,
        token: req.params.token,
        dateTime: new Date().toDateString()
    })
}