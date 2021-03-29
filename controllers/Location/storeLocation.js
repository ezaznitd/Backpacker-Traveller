const path = require('path');
const Location = require('../../database/models/Location');

module.exports = (req, res) => {
    try {
        Location.create({
            ...req.body,
            stateId: req.params.stateId
        }, (error, post) => {
            if (post) {
                req.flash('success', 'You have successfully created new Location!');
                res.redirect(`/${req.params.stateName}-${post.name}-all-travelPosts-${post._id}`);
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