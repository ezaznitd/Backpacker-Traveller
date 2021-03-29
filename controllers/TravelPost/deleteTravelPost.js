const TravelPost = require('../../database/models/TravelPosts');
const connectDB = require('../../database/connectDB');

module.exports = async (req, res) => {
    if (req.session.userId) {
        if (req.session.userId == '600c0f0fbc4b391f0135065e') {
            connectDB.databaseConnection;
            TravelPost.findByIdAndDelete(req.params.postId, (err, docs) => {
                if(docs) {
                    req.flash('success', 'You have successfully deleted the Travel Post!');
                    res.redirect('/');
                }
                else {
                    req.flash('warning', 'Some error occure. Please try again later!');
                    res.redirect(`/${req.params.stateName}-${req.params.locationName}-single-travelPost-${post.slug}-${post._id}`);
                }
            });
        }
        else {
            req.flash('warning', 'You do not have the permission to delete the post!');
            res.redirect(`/${req.params.stateName}-${req.params.locationName}-single-travelPost-${post.slug}-${post._id}`);
        }
    }
    else {
        req.flash('warning', 'You are not logged in. Please logged in before delete the post!');
        res.redirect(`/${req.params.stateName}-${req.params.locationName}-single-travelPost-${post.slug}-${post._id}`);
    }
}