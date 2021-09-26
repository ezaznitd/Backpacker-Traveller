const PrivacyPolicy = require('../../database/models/PrivacyPolicy');
const connectDB = require('../../database/connectDB');
const State = require('../../database/models/State');

module.exports = async (req, res) => {
    connectDB.databaseConnection;
    const privacyPolicy = await PrivacyPolicy.findById(req.params.policyId);
    const states = await State.find({});
    res.render("updatePrivacyPolicy", {
        success: req.flash('success'),
        warning: req.flash('warning'),
        info: req.flash('info'),
        danger: req.flash('danger'),
        privacyPolicy,
        policyType: req.params.policyType,
        states,
        dateTime: new Date().toDateString()
    });
}