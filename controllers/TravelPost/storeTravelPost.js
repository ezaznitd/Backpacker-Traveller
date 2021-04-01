const path = require('path');
const TravelPost = require('../../database/models/TravelPosts');

module.exports = (req, res) => {
    try {
        TravelPost.create({
            ...req.body,
            locationId: req.params.locationId
        }, (error, post) => {
            if (post) {
                req.flash('success', 'You have successfully created new Travel Post!');
                res.redirect(`/${req.params.stateName}/${req.params.locationName}/travelPost/${post.slug}/${post._id}/`);
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