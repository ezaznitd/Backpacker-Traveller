const Location = require('../../database/models/Location');
const State = require('../../database/models/State');
const ViewsCount = require('../../database/models/ViewsCount');
const connectDB = require('../../database/connectDB');

module.exports = async (req, res) => {
    connectDB.databaseConnection;
    if(req.session.language != 'bengali') {
        req.session.language = 'english';
    }
    const query = {stateId: `${req.params.stateId}`};
    const posts = await ViewsCount.find({postType: 'Blog Post', postLanguage: req.session.language}).sort({createdAt: -1});
    const lastModified = await ViewsCount.find({postType: 'Blog Post', postLanguage: req.session.language}).sort({updatedAt: -1});
    const trending = await ViewsCount.find({postLanguage: req.session.language}).limit(6).sort({viewsCount: -1});
    const map = await State.findById(req.params.stateId);
    const states = await State.find({});
    console.log(req.params.stateName);
    Location.find(query, (err, location) => {
        if (location) {
            res.render("locations", {
                success: req.flash('success'),
                warning: req.flash('warning'),
                info: req.flash('info'),
                location,
                posts,
                stateId: req.params.stateId,
                trending,
                lastModified,
                map,
                stateName: req.params.stateName,
                states,
                dateTime: new Date().toDateString()
            });
        }
        if (err) {
            res.redirect('/');
        }
    })
}