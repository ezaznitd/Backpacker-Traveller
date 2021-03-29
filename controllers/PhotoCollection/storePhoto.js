const path = require('path');
const Photo = require('../../database/models/PhotoCollection');

module.exports = (req, res) => {
    const zero = 0;
    try {
        Photo.create({
            ...req.body,
        }, (error, post) => {
            if (post) {
                req.flash('success', 'You have successfully created new photo!');
                res.redirect('/photos');
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