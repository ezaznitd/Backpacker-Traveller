const connectDB = require('../../database/connectDB');
const User = require('../../database/models/User');

module.exports = async (req, res) => {
    connectDB.databaseConnection;
    User.findOne({resetToken: req.params.token, expireToken: {$gt: Date.now()}})
    .then(user => {
        if (!user) {
            req.flash('info', 'Try again! your session expired');
            res.redirect('/auth-login');
        }
        user.password = req.body.password;
        user.resetToken = undefined;
        user.expireToken = undefined;
        user.save().then((saveuser) => {
            req.flash('info', 'Password update successfully');
        })
        res.redirect('/');
    }).catch(err => {
        req.flash('danger', 'Some error occure. Please try again later.');
        res.redirect('/auth-login');
    })
}