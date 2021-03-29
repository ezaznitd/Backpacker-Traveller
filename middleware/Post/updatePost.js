module.exports = (req, res, next) => {
    if (!req.body.image) {
        req.flash('danger', 'Please enter the image url!');
        return res.redirect(`/get-post-${req.params.postType}-${req.params.postTitle}-${req.params.id}`);
    }
    else if (!req.body.username) {
        req.flash('danger', 'Please enter the username!');
        return res.redirect(`/get-post-${req.params.postType}-${req.params.postTitle}-${req.params.id}`);
    }
    else if (!req.body.title) {
        req.flash('danger', 'Please enter the title!');
        return res.redirect(`/get-post-${req.params.postType}-${req.params.postTitle}-${req.params.id}`);
    }
    else if (!req.body.description) {
        req.flash('danger', 'Please enter the description!');
        return res.redirect(`/get-post-${req.params.postType}-${req.params.postTitle}-${req.params.id}`);
    }
    else if (!req.body.content) {
        req.flash('danger', 'Please enter the content!');
        return res.redirect(`/get-post-${req.params.postType}-${req.params.postTitle}-${req.params.id}`);
    }
    else if (!req.body.slug) {
        req.flash('danger', 'Please enter the slug!');
        return res.redirect(`/get-post-${req.params.postType}-${req.params.postTitle}-${req.params.id}`);
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
                return res.redirect(`/get-post-${req.params.postType}-${req.params.postTitle}-${req.params.id}`);
            }
        }
    }
 
    next()
}