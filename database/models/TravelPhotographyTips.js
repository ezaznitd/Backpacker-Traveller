const mongoose = require('mongoose');
const domPurifier = require('dompurify');
const {JSDOM} = require('jsdom');
const htmlPurify = domPurifier(new JSDOM().window);

// const stripHtml = require('string-strip-html');
const { stripHtml } = require('string-strip-html');

const TravelPhotographyTipsSchema = new mongoose.Schema({
	content: String,
	title: String,
	description: String,
	postLanguage: String,
  	username: String,
	snippet: {
		type: String
	}
});

TravelPhotographyTipsSchema.set('timestamps', true);

TravelPhotographyTipsSchema.index({
	content: 'text'
});

TravelPhotographyTipsSchema.pre('validate', function(next) {
	if (this.content) {
		this.content = htmlPurify.sanitize(this.content);
		this.snippet = stripHtml(this.content.substring(0,200)).result;
	}

	next();
})

const TravelPhotographyTips = mongoose.model('TravelPhotographyTips', TravelPhotographyTipsSchema);
 
module.exports = TravelPhotographyTips;