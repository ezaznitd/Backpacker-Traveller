const path = require('path');
const Video = require('../../database/models/Video');

module.exports = (req, res) => {
    try {
        Video.create({
            ...req.body,
            postType: req.params.postType,
            postLanguage: req.session.language
        }, (error, post) => {
            if (post) {
                req.flash('success', 'You have successfully created new Review Post!');
                res.redirect(`/single-video-${req.params.postType}-${post.slug}-${post._id}`);
            }
            else {
                req.flash('warning', 'Some error occure. Please try again later!');
                res.redirect("/");
            }
        });
    }
    catch (err) {
        req.flash('warning', 'Some error occure. Please try again later!');
        res.redirect('/');
    }
}