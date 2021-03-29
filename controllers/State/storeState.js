const path = require('path');
const State = require('../../database/models/State');

module.exports = (req, res) => {
    try {
        State.create({
            ...req.body
        }, (error, post) => {
            if (post) {
                req.flash('success', 'You have successfully created new State!');
                res.redirect(`/${post.name}-all-locations-${post._id}`);
            }
            else {
                req.flash('warning', 'Some error occure. Please try again later!');
                res.redirect("/new-state");
            }
        });
    }
    catch (err) {
        req.flash('warning', 'Some error occure. Please try again later!');
        res.redirect('/new-state');
    }
}