const ViewsCount = require('../../database/models/ViewsCount');
const connectDB = require('../../database/connectDB');

module.exports = async (req, res) => {
    var query = req.params.query;
    connectDB.databaseConnection;
    // await Post.createIndexes({content: 'text'});
    ViewsCount.find({
        $text: {
            $search: query
        }
    }, {
        score: {
            $meta: "textScore"
        }
    }, (err, result) => {
        if (result.length > 0) {
            res.render("getRelatedPost", {
                result
            })
        }
        else if (result.length == 0) {
            console.log('No post found');
            res.redirect('/');
        }
        else if (err) {
            console.log('Some error occure');
            res.redirect('/');
        }
    }).sort({ 
        score: { $meta: "textScore" }
    });
}