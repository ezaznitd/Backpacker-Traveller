module.exports = (req, res, next) => {
    if (req.params.postType == 'Travel Video') {
        if (!req.body.video) {
            req.flash('danger', 'Please enter the video!');
            return res.redirect(`/new-video-${req.params.postType}`);
        }
    }
    if (!req.body.username) {
        req.flash('danger', 'Please enter the username!');
        return res.redirect(`/new-video-${req.params.postType}`);
    }
    else if (!req.body.title) {
        req.flash('danger', 'Please enter the title!');
        return res.redirect(`/new-video-${req.params.postType}`);
    }
    else if (!req.body.slug) {
        req.flash('danger', 'Please enter the slug!');
        return res.redirect(`/new-video-${req.params.postType}`);
    }
    else if (!req.body.content) {
        req.flash('danger', 'Please enter the content!');
        return res.redirect(`/new-video-${req.params.postType}`);
    }
    else {
        const str = req.body.slug;
        for (var i = 0; i < str.length; i++) {
            if (str[i] >= 'a' && str[i] <= 'z') {
                continue;
            }
            else if (str[i] >= 'A' && str[i] <= 'Z') {
                continue;
            }
            else if (str[i] >= '0' && str[i] <= '9') {
                continue;
            }
            else if (str[i] == ' ') {
                continue;
            }
            else {
                req.flash('danger', 'Please check the slug!');
                return res.redirect(`/new-video-${req.params.postType}`);
            }
        }
    }

    next()
}