const TravelPost = require('../../database/models/TravelPosts');
const ViewsCount = require('../../database/models/ViewsCount');
const connectDB = require('../../database/connectDB');
const State = require('../../database/models/State');

module.exports = async (req, res) => {
    connectDB.databaseConnection;
    if(req.session.language != 'bengali') {
        req.session.language = 'english';
    }
    const query = {locationId: `${req.params.locationId}`};
    const posts = await ViewsCount.find({postType: 'Blog Post', postLanguage: req.session.language}).sort({createdAt: -1});
    const states = await State.find({});
    const NoOfPosts = await ViewsCount.find({postType: 'Blog Post', postLanguage: req.session.language}).countDocuments();
    var pageCount = NoOfPosts / 4;
    TravelPost.find(query, (err, travelPost) => {
        if (travelPost) {
            res.render("travelPosts", {
                success: req.flash('success'),
                warning: req.flash('warning'),
                info: req.flash('info'),
                travelPost,
                posts,
                locationId: req.params.locationId,
                locationName: req.params.locationName,
                stateName: req.params.stateName,
                states,
                dateTime: new Date().toDateString(),
                pageCount: Math.ceil(pageCount),
                currPageNo: parseInt(req.params.currPageNo),
                prevPage: parseInt(req.params.currPageNo) - 1,
                nextPage: parseInt(req.params.currPageNo) + 1
            });
        }
        if (err) {
            res.redirect('/');
        }
    })
}