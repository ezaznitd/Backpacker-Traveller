const path = require('path');
const FAQ = require('../../database/models/FAQ');

module.exports = (req, res) => {
    const zero = 0;
    try {
        FAQ.create({
            ...req.body,
        }, (error, post) => {
            if (post) {
                req.flash('success', `You have successfully created new FAQ!`);
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