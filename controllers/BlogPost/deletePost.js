const ViewsCount = require('../../database/models/ViewsCount');
const connectDB = require('../../database/connectDB');

module.exports = async (req, res) => {
    if (req.session.userId) {
        if (req.session.userId == '600c0f0fbc4b391f0135065e') {
            connectDB.databaseConnection;
            ViewsCount.findByIdAndDelete(req.params.id, (err, docs) => {
                if(docs) {
                    req.flash('success', 'You have successfully deleted the post!');
                    res.redirect('/');
                }
                else {
                    req.flash('warning', 'Some error occure. Please try again later!');
                    res.redirect(`/single-post-${req.params.postType}-${req.params.postTitle}-${req.params.id}`);
                }
            });
        }
        else {
            req.flash('warning', 'You do not have the permission to delete the post!');
            res.redirect(`/single-post-${req.params.postType}-${req.params.postTitle}-${req.params.id}`);
        }
    }
    else {
        req.flash('warning', 'You are not logged in. Please logged in before delete the post!');
        res.redirect(`/single-post-${req.params.postType}-${req.params.postTitle}-${req.params.id}`);
    }
}