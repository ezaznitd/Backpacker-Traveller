module.exports = (req, res, next) => {
    if (!req.body.name) {
        req.flash('danger', 'Please enter location name!');
        return res.redirect(`/new-location-${req.params.stateName}-${req.params.stateId}`);
    }
    else if (!req.body.username) {
        req.flash('danger', 'Please enter username!');
        return res.redirect(`/new-location-${req.params.stateName}-${req.params.stateId}`);
    }
    else if (!req.body.content) {
        req.flash('danger', 'Please enter content!');
        return res.redirect(`/new-location-${req.params.stateName}-${req.params.stateId}`);
    }
    else if (!req.body.image) {
        req.flash('danger', 'Please enter image!');
        return res.redirect(`/new-location-${req.params.stateName}-${req.params.stateId}`);
    }
    var str = req.body.name;
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
            req.flash('danger', 'Please check location name!');
            return res.redirect(`/new-location-${req.params.stateName}-${req.params.stateId}`);
        }
    }

    next()
}