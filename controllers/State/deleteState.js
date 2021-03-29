const State = require('../../database/models/State');
const Location = require('../../database/models/Location');
const TravelPost = require('../../database/models/TravelPosts');
const connectDB = require('../../database/connectDB');

module.exports = async (req, res) => {
    if (req.session.userId) {
        if (req.session.userId == '600c0f0fbc4b391f0135065e') {
            connectDB.databaseConnection;
            const locationQuery = {stateId: `${req.params.stateId}`};
            Location.find(locationQuery, (err1, post1) => {
                if (post1) {
                    for (var i = 0; i < post1.length; i++) {
                        var postQuery = {locationId: `${post1[i]._id}`};
                        TravelPost.find(postQuery, (err2, post2) => {
                            if (post2) {
                                for (var j = 0; j < post2.length; j++) {
                                    TravelPost.findByIdAndDelete(post2[j]._id, (err3, post3) => {
                                        if (err3) {
                                            req.flash('warning', 'Some error occure. Please try again later!');
                                            res.redirect(`/${req.params.stateName}-all-locations-${req.params.stateId}`);
                                        }
                                    })
                                }
                            }
                            else {
                                req.flash('warning', 'Some error occure. Please try again later!');
                                res.redirect(`/${req.params.stateName}-all-locations-${req.params.stateId}`);
                            }
                        })
                        Location.findByIdAndDelete(post1[i]._id, (err4, post4) => {
                            if (err4) {
                                req.flash('warning', 'Some error occure. Please try again later!');
                                res.redirect(`/${req.params.stateName}-all-locations-${req.params.stateId}`);
                            }
                        })
                    }
                    State.findByIdAndDelete(req.params.stateId, (err5, post5) => {
                        if (post5) {
                            req.flash('success', 'You have successfully deleted the State!');
                            res.redirect('/');
                        }
                        else {
                            req.flash('warning', 'Some error occure. Please try again later!');
                            res.redirect(`/${req.params.stateName}-all-locations-${req.params.stateId}`);
                        }
                    })
                }
                else {
                    req.flash('warning', 'Some error occure. Please try again later!');
                    res.redirect(`/${req.params.stateName}-all-locations-${req.params.stateId}`);
                }
            })
        }
        else {
            req.flash('warning', 'You do not have the permission to delete the post!');
            res.redirect(`/${req.params.stateName}-all-locations-${req.params.stateId}`);
        }
    }
    else {
        req.flash('warning', 'You are not logged in. Please logged in before delete the post!');
        res.redirect(`/${req.params.stateName}-all-locations-${req.params.stateId}`);
    }
}