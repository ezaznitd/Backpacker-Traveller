const User = require('../../database/models/User');
 
module.exports = (req, res) => {
    if (req.session.userId) {
        req.flash('warning', 'You are already logged in!');
        res.redirect('/');
    }
    else {
        const {
            username,
            email,
            password
        } = req.body;
        User.findOne({
            email
        }, (error, user) => {
            if (user) {
                req.flash('danger', 'This email has already been used!');
                res.redirect('/auth/login/');
            }
            else {
                User.create(req.body, (error, user) => {
                    if(error) {
                        req.flash('danger', 'You have entered wrong credential!');
                        res.redirect('/auth/login/');
                    }
                    req.flash('success', 'You are successfully registered!');
                    res.redirect('/');
                })
            }
        })
    }
}