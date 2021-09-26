module.exports = (req, res, next) => {
    if (!req.body.username) {
        req.flash('danger', 'Please enter the username!');
        return res.redirect(`/get/${req.params.policyType}/${req.params.policyId}/`);
    }
    else if (!req.body.content) {
        req.flash('danger', 'Please enter the content!');
        return res.redirect(`/get/${req.params.policyType}/${req.params.policyId}/`);
    }

    next()
}