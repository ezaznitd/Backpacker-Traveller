const ViewsCount = require('../../database/models/ViewsCount');
const connectDB = require('../../database/connectDB');
const State = require('../../database/models/State');

module.exports = async (req, res) => {
    connectDB.databaseConnection;
    if(req.session.language != 'bengali') {
        req.session.language = 'english';
    }
    const query = await ViewsCount.findById(req.params.id);
    var cnt = query.viewsCount + 1;
    const newPost = {
        postType: query.postType,
        viewsCount: cnt,
        title: query.title,
        description: query.description,
        content: query.content,
        username: query.username,
        image: query.image,
        slug: query.slug,
        postLanguage: query.postLanguage
    }
    ViewsCount.findByIdAndUpdate(req.params.id, newPost, (err, post) => {});
    const post = await ViewsCount.findById(req.params.id);
    const lastModified = await ViewsCount.find({postLanguage: req.session.language}).limit(6).sort({updatedAt: -1});
    const trending = await ViewsCount.find({postLanguage: req.session.language}).limit(5).sort({viewsCount: -1});
    const states = await State.find({});
    res.render("post", {
        success: req.flash('success'),
        warning: req.flash('warning'),
        info: req.flash('info'),
        post,
        lastModified,
        trending,
        cnt,
        states,
        dateTime: new Date().toDateString()
    });
}