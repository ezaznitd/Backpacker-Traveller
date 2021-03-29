const User = require('../../database/models/User');
 
module.exports = (req, res) => {
    if (req.session.userId) {
        const registrationErrors = 'You are already logged in!';
        req.flash('registrationErrors', registrationErrors);
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
                const registrationErrors = 'This email has already been used!';
                req.flash('registrationErrors', registrationErrors);
                res.redirect('/auth-register');
            }
            else {
                User.create(req.body, (error, user) => {
                    if(error) {
                        const registrationErrors = 'You have entered wrong credential!';
                        req.flash('registrationErrors', registrationErrors);
                        res.redirect('/auth-register');
                    }
                    const registrationErrors = 'You have successfully registered!';
                    req.flash('registrationErrors', registrationErrors);
                    res.redirect('/');
                })
            }
        })
    }
}