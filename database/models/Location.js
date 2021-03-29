const mongoose = require('mongoose');
const domPurifier = require('dompurify');
const {JSDOM} = require('jsdom');
const htmlPurify = domPurifier(new JSDOM().window);

// const stripHtml = require('string-strip-html');
const { stripHtml } = require('string-strip-html');

const LocationSchema = new mongoose.Schema({
	name: String,
	username: String,
	content: String,
	stateId: String,
	image: String,
	snippet: {
		type: String
	}
});

LocationSchema.set('timestamps', true);

LocationSchema.index({
	content: 'text'
});

LocationSchema.pre('validate', function(next) {
	if (this.content) {
		this.content = htmlPurify.sanitize(this.content);
		this.snippet = stripHtml(this.content.substring(0,200)).result;
	}

	next();
})

const Location = mongoose.model('Location', LocationSchema);
 
module.exports = Location;