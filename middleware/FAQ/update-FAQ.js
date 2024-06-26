module.exports = (req, res, next) => {
    if (!req.body['username']) {
        req.flash('danger', 'Please enter the username!');
        return res.redirect(`/FAQ/`);
    }
    else if (!req.body.question) {
        req.flash('danger', 'Please enter the question!');
        return res.redirect(`/FAQ/`);
    }
    else if (!req.body.content) {
        req.flash('danger', 'Please enter the content!');
        return res.redirect(`/FAQ/`);
    }

    next()
}