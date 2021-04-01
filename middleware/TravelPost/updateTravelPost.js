module.exports = (req, res, next) => {
    if (!req.body.image) {
        req.flash('danger', 'Please enter image!');
        return res.redirect(`/get/travelPost/${req.params.stateName}/${req.params.locationName}/${req.params.postTitle}/${req.params.postId}/`);
    }
    else if (!req.body.username) {
        req.flash('danger', 'Please enter username!');
        return res.redirect(`/get/travelPost/${req.params.stateName}/${req.params.locationName}/${req.params.postTitle}/${req.params.postId}/`);
    }
    else if (!req.body.title) {
        req.flash('danger', 'Please enter title!');
        return res.redirect(`/get/travelPost/${req.params.stateName}/${req.params.locationName}/${req.params.postTitle}/${req.params.postId}/`);
    }
    else if (!req.body.description) {
        req.flash('danger', 'Please enter description!');
        return res.redirect(`/get/travelPost/${req.params.stateName}/${req.params.locationName}/${req.params.postTitle}/${req.params.postId}/`);
    }
    else if (!req.body.content) {
        req.flash('danger', 'Please enter content!');
        return res.redirect(`/get/travelPost/${req.params.stateName}/${req.params.locationName}/${req.params.postTitle}/${req.params.postId}/`);
    }
    else if (!req.body.slug) {
        req.flash('danger', 'Please enter slug!');
        return res.redirect(`/get/travelPost/${req.params.stateName}/${req.params.locationName}/${req.params.postTitle}/${req.params.postId}/`);
    }
    var str = req.body.slug;
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
            req.flash('danger', 'Please check the title!');
        return res.redirect(`/get/travelPost/${req.params.stateName}/${req.params.locationName}/${req.params.postTitle}/${req.params.postId}/`);
        }
    }

    next()
}