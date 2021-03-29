const mongoose = require('mongoose');
const domPurifier = require('dompurify');
const {JSDOM} = require('jsdom');
const htmlPurify = domPurifier(new JSDOM().window);

// const stripHtml = require('string-strip-html');
const { stripHtml } = require('string-strip-html');

const ViewsCountSchema = new mongoose.Schema({
    postType: String,
	viewsCount: {type: Number},
	title: String,
	description: String,
	content: String,
	username: String,
	image: String,
	slug: String,
	postLanguage: String,
	snippet: {
		type: String
	}
});

ViewsCountSchema.set('timestamps', true);

ViewsCountSchema.index({
	content: 'text'
});

ViewsCountSchema.pre('validate', function(next) {
	if (this.content) {
		this.content = htmlPurify.sanitize(this.content);
		this.snippet = stripHtml(this.content.substring(0,200)).result;
	}

	next();
})

const ViewsCount = mongoose.model('ViewsCount', ViewsCountSchema);
 
module.exports = ViewsCount;