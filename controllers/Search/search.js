module.exports = async (req, res) => {
    var query = req.body.search;
    const queryString = encodeURIComponent(`${query}`);
    res.redirect('/searchText?queryText=' + queryString);
}