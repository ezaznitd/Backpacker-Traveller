const ViewsCount = require('../../database/models/ViewsCount');
const connectDB = require('../../database/connectDB');
const User = require('../../database/models/User');
const State = require('../../database/models/State');

module.exports = async (req, res) => {
    connectDB.databaseConnection;
    if(req.session.language != 'bengali') {
        req.session.language = 'english';
    }
    const lastModified = await ViewsCount.find({postType: req.params.postType, postLanguage: req.session.language}).sort({updatedAt: -1});
    const trending = await ViewsCount.find({postLanguage: req.session.language}).limit(6).sort({viewsCount: -1});
    const user = await User.findById(req.session.userId);
    const states = await State.find({});
    if (req.session.userId) {
        if (req.session.userId == '600c0f0fbc4b391f0135065e') {
            connectDB.databaseConnection;
            res.render("createPhoto", {
                success: req.flash('success'),
                warning: req.flash('warning'),
                info: req.flash('info'),
                danger: req.flash('danger'),
                user,
                lastModified,
                trending,
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