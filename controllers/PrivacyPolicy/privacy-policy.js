const connectDB = require('../../database/connectDB');
const State = require('../../database/models/State');
const PrivacyPolicy = require('../../database/models/PrivacyPolicy');

module.exports = async (req, res) => {
    connectDB.databaseConnection;
    const states = await State.find({});
    const privacyPolicy = await PrivacyPolicy.findById(req.params.policyId);
    res.render('privacy-policy', {
        success: req.flash('success'),
        warning: req.flash('warning'),
        info: req.flash('info'),
        danger: req.flash('danger'),
        states,
        privacyPolicy,
        policyType: req.params.policyType,
        dateTime: new Date().toDateString()
    });
};