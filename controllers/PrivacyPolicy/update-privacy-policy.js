const PrivacyPolicy = require('../../database/models/PrivacyPolicy');
const connectDB = require('../../database/connectDB');

module.exports = async (req, res) => {
    connectDB.databaseConnection;
    if (req.session.userId) {
        if (req.session.userId == '600c0f0fbc4b391f0135065e') {
            connectDB.databaseConnection;
            try {
                const newPost = {
                    content: req.body.content,
                    username: req.body.username
                }
                PrivacyPolicy.findByIdAndUpdate(req.params.policyId, newPost, (error, post) => {
                    if (post) {
                        req.flash('info', `You have successfully updated the ${req.params.policyType}!`);
                        if (post._id == '61503164f07f4731640105a8') {
                            res.redirect(`/privacy/policy/Privacy Policy/${post._id}/`);
                        }
                        else if (post._id == '615038773f4d100730f616e4') {
                            res.redirect(`/privacy/policy/Terms Of Service/${post._id}/`);
                        }
                        else {
                            res.redirect('/');
                        }
                    }
                    else {
                        req.flash('warning', 'Some error occure during updating your post please try again after some time!');
                        res.redirect('/');
                    }
                });
            }
            catch (err) {
                req.flash('warning', 'Some error occure during updating your post please try again after some time!');
                res.redirect('/');
            }
        }
        else {
            req.flash('warning', 'You do not have the permission to update a post!');
            res.redirect('/');
        }
    }
    else {
        req.flash('warning', 'Please log in before updating a post!');
        res.redirect('/');
    }
}