const connectDB = require('../../database/connectDB');
const State = require('../../database/models/State');

module.exports = async (req, res) => {
    connectDB.databaseConnection;
    const states = await State.find({});
    if (req.session.userId) {
        if (req.session.userId == '600c0f0fbc4b391f0135065e') {
            connectDB.databaseConnection;
            res.render("create-FAQ", {
                success: req.flash('success'),
                warning: req.flash('warning'),
                info: req.flash('info'),
                danger: req.flash('danger'),
                postType: req.params.postType,
                states,
                dateTime: new Date().toDateString()
            });
        }
        else {
            res.redirect('/');
        }
    }
    else {
        res.redirect('/');
    }
};