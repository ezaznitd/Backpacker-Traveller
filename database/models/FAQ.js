const mongoose = require('mongoose');
const domPurifier = require('dompurify');
const {JSDOM} = require('jsdom');
const htmlPurify = domPurifier(new JSDOM().window);

// const stripHtml = require('string-strip-html');
const { stripHtml } = require('string-strip-html');

const FAQSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    question: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    snippet: {
		type: String
	}
})
 
FAQSchema.set('timestamps', true);

FAQSchema.index({
	content: 'text'
});

FAQSchema.pre('validate', function(next) {
	if (this.content) {
		this.content = htmlPurify.sanitize(this.content);
		this.snippet = stripHtml(this.content.substring(0,5000)).result;
	}

	next();
})

const FAQ = mongoose.model('FAQ', FAQSchema);
 
module.exports = FAQ;