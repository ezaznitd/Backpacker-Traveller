const path = require('path');
const Subscriber = require('../../database/models/Subscriber');

module.exports = (req, res) => {
    try {
        Subscriber.create({
            ...req.body,
        }, (error, post) => {
            if (post) {
                req.flash('success', `You have successfully subscribed!`);
                res.redirect(`/`);
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