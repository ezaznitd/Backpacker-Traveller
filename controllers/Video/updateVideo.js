const path = require('path');
const Video = require('../../database/models/Video');
const connectDB = require('../../database/connectDB');

module.exports = async (req, res) => {
    connectDB.databaseConnection;
    if (req.session.userId) {
        if (req.session.userId == '600c0f0fbc4b391f0135065e') {
            connectDB.databaseConnection;
            try {
                // var new_image = [];
                // var image_name = req.files.image;
                // var single_image = '/posts/' + image_name.name;
                // new_image.push(single_image);
                // image_name.mv(path.resolve(__dirname, '..', 'public/posts', image_name.name), (error) => {
                // })
                const newPost = {
                    title: req.body.title,
                    content: req.body.content,
                    username: req.body.username,
                    video: req.body.video,
                    slug: req.body.slug,
                    postLanguage: req.session.language
                }
                Video.findByIdAndUpdate(req.params.id, newPost, (error, post) => {
                    if (post) {
                        req.flash('info', 'You have successfully updated the review!');
                        res.redirect(`/single-video-${req.params.postType}-${post.slug}-${req.params.id}`);
                    }
                    else {
                        req.flash('warning', 'Some error occure during updating your post please try again after some time!');
                        res.redirect(`/single-video-${req.params.postType}-${req.params.slug}-${req.params.id}`);
                    }
                });
            }
            catch (err) {
                req.flash('warning', 'Some error occure during updating your post please try again after some time!');
                res.redirect(`/single-video-${req.params.postType}-${req.params.slug}-${req.params.id}`);
            }
        }
        else {
            req.flash('warning', 'You do not have the permission to update a post!');
            res.redirect(`/single-video-${req.params.postType}-${req.params.slug}-${req.params.id}`);
        }
    }
    else {
        req.flash('warning', 'Please log in before updating a post!');
        res.redirect(`/single-video-${req.params.postType}-${req.params.slug}-${req.params.id}`);
    }
}