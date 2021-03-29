const path = require('path');
const ViewsCount = require('../../database/models/ViewsCount');

module.exports = (req, res) => {
    const zero = 0;
    try {
        ViewsCount.create({
            ...req.body,
            postType: req.params.postType,
            viewsCount: 0,
            postLanguage: req.session.language
        }, (error, post) => {
            if (post) {
                req.flash('success', 'You have successfully created new post!');
                res.redirect(`/single-post-${req.params.postType}-${post.slug}-${post._id}`);
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