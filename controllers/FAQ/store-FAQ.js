const path = require('path');
const FAQ = require('../../database/models/FAQ');
const FAQMail = require('../send-Email/send-email');

module.exports = (req, res) => {
    const zero = 0;
    try {
        FAQ.create({
            ...req.body,
        }, (error, post) => {
            if (post) {
                req.flash('success', `You have successfully created new FAQ!`);
                FAQMail.sendEmail(req.body.question, req.body.content);
                res.redirect(`/FAQ`);
            }
            else {
                req.flash('warning', 'Some error occure. Please try again later!');
                res.redirect("/FAQ");
            }
        });
    }
    catch (err) {
        req.flash('warning', 'Some error occure. Please try again later!');
        res.redirect('/FAQ');
    }
}