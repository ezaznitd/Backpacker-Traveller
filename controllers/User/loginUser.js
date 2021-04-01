const bcrypt = require('bcrypt');
const User = require('../../database/models/User');
const auth = require('../../middleware/auth');
 
module.exports = (req, res) => {
    if (req.session.userId) {
        const warning = 'You are already logged in!';
        req.flash('warning', warning);
        res.redirect('/')
    }
    else {
        const {
            email,
            password
        } = req.body;
        User.findOne({
            email
        }, (error, user) => {
            if (user) {
                bcrypt.compare(password, user.password, (error, same) => {
                    if (same) {
                        req.session.userId = user._id;
                        const success = 'You have successfully logged in!';
                        req.flash('success', success);
                        res.redirect('/')
                    } else {
                        const danger = 'You have entered wrong password!';
                        req.flash('danger', danger);
                        res.redirect('/auth/login/')
                    }
                })
            }
            else {
                const danger = 'You have entered wrong email';
                req.flash('danger', danger)
                res.redirect('/auth/login/')
            }
        })
    }
}