const mongoose = require('mongoose');
const domPurifier = require('dompurify');
const {JSDOM} = require('jsdom');
const htmlPurify = domPurifier(new JSDOM().window);

// const stripHtml = require('string-strip-html');
const { stripHtml } = require('string-strip-html');

const StateSchema = new mongoose.Schema({
	name: String,
	username: String,
	content: String,
	description: String,
	map: String,
	image: String,
	snippet: {
		type: String
	}
});

StateSchema.set('timestamps', true);

StateSchema.index({
	content: 'text'
});

StateSchema.pre('validate', function(next) {
	if (this.content) {
		this.content = htmlPurify.sanitize(this.content);
		this.snippet = stripHtml(this.content.substring(0,200)).result;
	}

	next();
})

const State = mongoose.model('State', StateSchema);
 
module.exports = State;