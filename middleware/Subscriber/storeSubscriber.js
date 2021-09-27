module.exports = (req, res, next) => {
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(!req.body.email.match(regexEmail)) {
        req.flash('danger', 'Please check your email!');
        return res.redirect('/');
    }
 
    next()
}