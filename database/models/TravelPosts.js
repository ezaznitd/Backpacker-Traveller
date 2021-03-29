const mongoose = require('mongoose');
const domPurifier = require('dompurify');
const {JSDOM} = require('jsdom');
const htmlPurify = domPurifier(new JSDOM().window);

// const stripHtml = require('string-strip-html');
const { stripHtml } = require('string-strip-html');

const TravelPostSchema = new mongoose.Schema({
	locationId: String,
	content: String,
    title: String,
  	description: String,
  	username: String,
	image: String,
	slug: String,
	snippet: {
		type: String
	}
});

TravelPostSchema.set('timestamps', true);

TravelPostSchema.index({
	content: 'text'
});

TravelPostSchema.pre('validate', function(next) {
	if (this.content) {
		this.content = htmlPurify.sanitize(this.content);
		this.snippet = stripHtml(this.content.substring(0,200)).result;
	}

	next();
})

const TravelPost = mongoose.model('TravelPost', TravelPostSchema);
 
module.exports = TravelPost;