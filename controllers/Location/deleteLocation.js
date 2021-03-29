const TravelPost = require('../../database/models/TravelPosts');
const Location = require('../../database/models/Location');
const connectDB = require('../../database/connectDB');

module.exports = async (req, res) => {
    if (req.session.userId) {
        if (req.session.userId == '600c0f0fbc4b391f0135065e') {
            connectDB.databaseConnection;
            const query = {locationId: `${req.params.locationId}`};
            TravelPost.find(query, (err1, post) => {
                if (post) {
                    for (var i = 0; i < post.length; i++) {
                        TravelPost.findByIdAndDelete(post[i]._id, (err2, sol) => {
                            if (err2) {
                                res.redirect(`/${req.params.stateName}-${post.name}-all-travelPosts-${req.params.locationId}`);
                            }
                        });
                    }
                    Location.findByIdAndDelete(req.params.locationId, (err3, docs) => {
                        if (docs) {
                            req.flash('success', 'You have successfully deleted the Location!');
                            res.redirect('/');
                        }
                        else {
                            req.flash('warning', 'Some error occure. Please try again later!');
                            res.redirect(`/${req.params.stateName}-${post.name}-all-travelPosts-${req.params.locationId}`);
                        }
                    })
                }
                else {
                    req.flash('warning', 'Some error occure. Please try again later!');
                    res.redirect(`/${req.params.stateName}-${post.name}-all-travelPosts-${req.params.locationId}`);
                }
            })
        }
        else {
            req.flash('warning', 'You do not have the permission to delete the post!');
            res.redirect(`/${req.params.stateName}-${post.name}-all-travelPosts-${req.params.locationId}`);
        }
    }
    else {
        req.flash('warning', 'You are not logged in. Please logged in before delete the post!');
        res.redirect(`/${req.params.stateName}-${post.name}-all-travelPosts-${req.params.locationId}`);
    }
}