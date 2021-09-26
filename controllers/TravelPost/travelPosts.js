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
    const lastModified = await ViewsCount.find({postLanguage: req.session.language}).limit(6).sort({updatedAt: -1});
    const trending = await ViewsCount.find({postLanguage: req.session.language}).limit(5).sort({viewsCount: -1});
    const states = await State.find({});
    const NoOfPosts = await TravelPost.find({locationId: req.params.locationId}).countDocuments();
    var pageCount = NoOfPosts / 4;
    TravelPost.find(query, (err, travelPost) => {
        if (travelPost) {
            res.render("travelPosts", {
                success: req.flash('success'),
                warning: req.flash('warning'),
                info: req.flash('info'),
                travelPost,
                lastModified,
                trending,
                locationId: req.params.locationId,
                locationName: req.params.locationName,
                stateName: req.params.stateName,
                states,
                dateTime: new Date().toDateString(),
                pageCount: Math.ceil(pageCount),
                currPageNo: 1,
                prevPage: 0,
                nextPage: 2
            });
        }
        if (err) {
            res.redirect('/');
        }
    })
}