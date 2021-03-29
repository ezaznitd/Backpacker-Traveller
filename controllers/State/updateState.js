const path = require('path');
const State = require('../../database/models/State');
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
                    name: req.body.name,
                    content: req.body.content,
                    username: req.body.username,
                    map: req.body.map,
                    image: req.body.image,
                    description: req.body.description
                }
                State.findByIdAndUpdate(req.params.stateId, newPost, (error, post) => {
                    if (post) {
                        req.flash('info', 'You have successfully updated the state!');
                        res.redirect(`/${req.params.stateName}-all-locations-${req.params.stateId}`);
                    }
                    else {
                        req.flash('warning', 'Some error occure during updating your post please try again after some time!');
                        res.redirect(`/${req.params.stateName}-all-locations-${req.params.stateId}`);
                    }
                });
            }
            catch (err) {
                req.flash('warning', 'Some error occure during updating your post please try again after some time!');
                res.redirect(`/${req.params.stateName}-all-locations-${req.params.stateId}`);
            }
        }
        else {
            req.flash('warning', 'You do not have the permission to update a post!');
            res.redirect(`/${req.params.stateName}-all-locations-${req.params.stateId}`);
        }
    }
    else {
        req.flash('warning', 'Please log in before updating a post!');
        res.redirect(`/${req.params.stateName}-all-locations-${req.params.stateId}`);
    }
}