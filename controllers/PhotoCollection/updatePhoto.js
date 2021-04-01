const path = require('path');
const Photo = require('../../database/models/PhotoCollection');
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
                    username: req.body.username,
                    image: req.body.image,
                }
                Photo.findByIdAndUpdate(req.params.id, newPost, (err, post) => {
                    if (post) {
                        req.flash('info', 'You have successfully updated the post!');
                        res.redirect('/photos/');
                    }
                    else {
                        req.flash('warning', 'Some error occure during updating your post please try again after some time!');
                        res.redirect('/photos/');
                    }
                });
            }
            catch (err) {
                req.flash('warning', 'Some error occure during updating your post please try again after some time!');
                res.redirect('/photos/');
            }
        }
        else {
            req.flash('warning', 'You do not have the permission to update a post!');
            res.redirect('/photos/');
        }
    }
    else {
        req.flash('warning', 'Please log in before updating a post!');
        res.redirect('/photos/');
    }
}