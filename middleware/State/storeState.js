module.exports = (req, res, next) => {
    if (!req.body.name) {
        req.flash('danger', 'Please enter state name!');
        return res.redirect('/new-state');
    }
    else if (!req.body.username) {
        req.flash('danger', 'Please enter username!');
        return res.redirect('/new-state');
    }
    else if (!req.body.description) {
        req.flash('danger', 'Please enter description!');
        return res.redirect('/new-state');
    }
    else if (!req.body.content) {
        req.flash('danger', 'Please enter content!');
        return res.redirect('/new-state');
    }
    else if (!req.body.image) {
        req.flash('danger', 'Please enter image!');
        return res.redirect('/new-state');
    }
    else if (!req.body.map) {
        req.flash('danger', 'Please enter map!');
        return res.redirect('/new-state');
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
            req.flash('danger', 'Please check state name!');
            return res.redirect('/new-state');
        }
    }

    next()
}