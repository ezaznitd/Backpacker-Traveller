
module.exports = async (req, res) => {
    if (!req.session.language || req.session.language == 'english') {
        req.session.language = 'bengali';
    }
    else {
        req.session.language = 'english';
    }
    req.flash('success', `You have change language to ${req.session.language}`);
    res.redirect('/');
}