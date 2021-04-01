module.exports = (req, res, next) => {
    if (!req.body.image) {
        req.flash('danger', 'Please enter the image url!');
        return res.redirect('/new/photo/');
    }
    else if (!req.body.username) {
        req.flash('danger', 'Please enter the username!');
        return res.redirect('/new/photo/');
    }
    else if (!req.body.title) {
        req.flash('danger', 'Please enter the title!');
        return res.redirect('/new/photo/');
    }
    else if (!req.body.content) {
        req.flash('danger', 'Please enter the content!');
        return res.redirect('/new/photo/');
    }
 
    next()
}