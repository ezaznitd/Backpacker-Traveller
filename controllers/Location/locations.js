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
    const map = await State.findById(req.params.stateId);
    const states = await State.find({});
    const lastModified = await ViewsCount.find({postLanguage: req.session.language}).limit(6).sort({updatedAt: -1});
    Location.find(query, (err, location) => {
        if (location) {
            res.render("locations", {
                success: req.flash('success'),
                warning: req.flash('warning'),
                info: req.flash('info'),
                location,
                stateId: req.params.stateId,
                map,
                stateName: req.params.stateName,
                states,
                lastModified,
                dateTime: new Date().toDateString()
            });
        }
        if (err) {
            res.redirect('/');
        }
    })
}