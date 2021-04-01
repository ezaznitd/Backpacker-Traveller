const path = require('path');
const ViewsCount = require('../../database/models/ViewsCount');
const connectDB = require('../../database/connectDB');

module.exports = async (req, res) => {
    connectDB.databaseConnection;
    if (req.session.userId) {
        if (req.session.userId == '600c0f0fbc4b391f0135065e') {
            connectDB.databaseConnection;
            try {
                const query = await ViewsCount.findById(req.params.id);
                var cnt = query.viewsCount + 1;
                const newPost = {
                    postType: query.postType,
                    viewsCount: cnt,
                    title: req.body.title,
                    slug: req.body.slug,
                    description: req.body.description,
                    content: req.body.content,
                    username: req.body.username,
                    image: req.body.image,
                    postLanguage: req.session.language,
                }
                ViewsCount.findByIdAndUpdate(req.params.id, newPost, (err, post) => {
                    if (post) {
                        req.flash('info', `You have successfully updated the ${req.params.postType}!`);
                        res.redirect(`/post/${req.params.postType}/${post.title}/${req.params.id}/`);
                    }
                    else {
                        req.flash('warning', `Some error occure during updating your ${req.params.postType} please try again after some time!`);
                        res.redirect(`/post/${req.params.postType}/${post.title}/${req.params.id}/`);
                    }
                });
            }
            catch (err) {
                req.flash('warning', `Some error occure during updating your ${req.params.postType} please try again after some time!`);
                res.redirect(`/post/${req.params.postType}/${post.title}/${req.params.id}/`);
            }
        }
        else {
            req.flash('warning', `You do not have the permission to update a ${req.params.postType}!`);
            res.redirect(`/post/${req.params.postType}/${post.title}/${req.params.id}/`);
        }
    }
    else {
        req.flash('warning', `Please log in before updating a ${req.params.postType}!`);
        res.redirect(`/post/${req.params.postType}/${post.title}/${req.params.id}/`);
    }
}