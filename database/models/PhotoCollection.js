const mongoose = require('mongoose');
const domPurifier = require('dompurify');
const {JSDOM} = require('jsdom');
const htmlPurify = domPurifier(new JSDOM().window);

// const stripHtml = require('string-strip-html');
const { stripHtml } = require('string-strip-html');

const PhotoCollectionSchema = new mongoose.Schema({
	title: String,
	username: String,
	content: String,
	image: String,
	snippet: {
		type: String
	}
});

PhotoCollectionSchema.set('timestamps', true);

PhotoCollectionSchema.index({
	content: 'text'
});

PhotoCollectionSchema.pre('validate', function(next) {
	if (this.content) {
		this.content = htmlPurify.sanitize(this.content);
		this.snippet = stripHtml(this.content.substring(0,200)).result;
	}

	next();
})

const PhotoCollection = mongoose.model('PhotoCollection', PhotoCollectionSchema);
 
module.exports = PhotoCollection;