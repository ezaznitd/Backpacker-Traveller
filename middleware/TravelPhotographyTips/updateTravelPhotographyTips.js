module.exports = (req, res, next) => {
    if (!req.body.username) {
        req.flash('danger', 'Please enter the username!');
        return res.redirect(`/get/travelPhotographyTips/${req.params.id}/`);
    }
    else if (!req.body.title) {
        req.flash('danger', 'Please enter the title!');
        return res.redirect(`/get/travelPhotographyTips/${req.params.id}/`);
    }
    else if (!req.body.description) {
        req.flash('danger', 'Please enter the description!');
        return res.redirect(`/get/travelPhotographyTips/${req.params.id}/`);
    }
    else if (!req.body.content) {
        req.flash('danger', 'Please enter the content!');
        return res.redirect(`/get/travelPhotographyTips/${req.params.id}/`);
    }

    next()
}