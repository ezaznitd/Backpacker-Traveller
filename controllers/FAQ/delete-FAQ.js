const FAQ = require('../../database/models/FAQ');
const connectDB = require('../../database/connectDB');

module.exports = async (req, res) => {
    if (req.session.userId) {
        if (req.session.userId == '600c0f0fbc4b391f0135065e') {
            connectDB.databaseConnection;
            const faq = await FAQ.find({question: req.body['question']})
            FAQ.findByIdAndDelete(faq[0]._id, (err, docs) => {
                if(docs) {
                    req.flash('success', `You have successfully deleted the FAQ!`);
                    res.redirect('/FAQ');
                }
                else {
                    req.flash('warning', 'Some error occure. Please try again later!');
                    res.redirect(`/FAQ`);
                }
            });
        }
        else {
            req.flash('warning', `You do not have the permission to delete the FAQ!`);
            res.redirect(`/FAQ`);
        }
    }
    else {
        req.flash('warning', `You are not logged in. Please logged in before delete the FAQ!`);
        res.redirect(`/FAQ`);
    }
}