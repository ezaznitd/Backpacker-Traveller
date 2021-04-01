const path = require('path');
const TravelPhotographyTips = require('../../database/models/TravelPhotographyTips');
const connectDB = require('../../database/connectDB');

module.exports = async (req, res) => {
    connectDB.databaseConnection;
    if (req.session.userId) {
        if (req.session.userId == '600c0f0fbc4b391f0135065e') {
            connectDB.databaseConnection;
            try {
                const newPost = {
                    title: req.body.title,
                    content: req.body.content,
                    description: req.body.description,
                    username: req.body.username,
                    postLanguage: req.session.language
                }
                TravelPhotographyTips.findByIdAndUpdate(req.params.id, newPost, (error, post) => {
                    if (post) {
                        req.flash('info', 'You have successfully updated the travel photography tips!');
                        if (post._id == '60534749775cb32b2bc6f96f') {
                            res.redirect(`/travel-photography-tips/${post._id}/`);
                        }
                        else if (post._id == '6053495d775cb32b2bc6f970') {
                            res.redirect(`/best-travel-camera/${post._id}/`);
                        }
                        else if (post._id == '60534bae72fd9c2feb14e3e2') {
                            res.redirect(`/my-photo-gear/${post._id}/`);
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