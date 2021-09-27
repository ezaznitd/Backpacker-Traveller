const FAQ = require('../../database/models/FAQ');
const connectDB = require('../../database/connectDB');

module.exports = async (req, res) => {
    connectDB.databaseConnection;
    if (req.session.userId) {
        if (req.session.userId == '600c0f0fbc4b391f0135065e') {
            connectDB.databaseConnection;
            try {
                const newPost = {
                    question: req.body.question,
                    content: req.body.content,
                    username: req.body.username,
                }
                FAQ.findByIdAndUpdate(req.params.faqId, newPost, (err, post) => {
                    if (post) {
                        req.flash('info', `You have successfully updated the FAQ!`);
                        res.redirect(`/FAQ/`);
                    }
                    else {
                        req.flash('warning', `Some error occure during updating your FAQ please try again after some time!`);
                        res.redirect(`/FAQ/`);
                    }
                });
            }
            catch (err) {
                req.flash('warning', `Some error occure during updating your FAQ please try again after some time!`);
                res.redirect(`/FAQ/`);
            }
        }
        else {
            req.flash('warning', `You do not have the permission to update a FAQ!`);
            res.redirect(`/FAQ/`);
        }
    }
    else {
        req.flash('warning', `Please log in before updating a FAQ!`);
        res.redirect(`/FAQ/`);
    }
}