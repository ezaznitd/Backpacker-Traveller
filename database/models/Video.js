const mongoose = require('mongoose');
const domPurifier = require('dompurify');
const {JSDOM} = require('jsdom');
const htmlPurify = domPurifier(new JSDOM().window);

// const stripHtml = require('string-strip-html');
const { stripHtml } = require('string-strip-html');

const VideoSchema = new mongoose.Schema({
	title: String,
	username: String,
	video: String,
	content: String,
	postType: String,
	slug: String,
	postLanguage: String,
	snippet: {
		type: String
	}
});

VideoSchema.set('timestamps', true);

VideoSchema.index({
	title: 'text'
});

VideoSchema.pre('validate', function(next) {
	if (this.title) {
		this.title = htmlPurify.sanitize(this.title);
		this.snippet = stripHtml(this.title.substring(0,200)).result;
	}

	next();
})

const Video = mongoose.model('Video', VideoSchema);
 
module.exports = Video;