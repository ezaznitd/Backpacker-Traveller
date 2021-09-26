const mongoose = require('mongoose');
const domPurifier = require('dompurify');
const {JSDOM} = require('jsdom');
const htmlPurify = domPurifier(new JSDOM().window);

// const stripHtml = require('string-strip-html');
const { stripHtml } = require('string-strip-html');

const PrivacyPolicySchema = new mongoose.Schema({
    username: {
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
 
PrivacyPolicySchema.set('timestamps', true);

PrivacyPolicySchema.index({
	content: 'text'
});

PrivacyPolicySchema.pre('validate', function(next) {
	if (this.content) {
		this.content = htmlPurify.sanitize(this.content);
		this.snippet = stripHtml(this.content.substring(0,5000)).result;
	}

	next();
})

const PrivacyPolicy = mongoose.model('PrivacyPolicy', PrivacyPolicySchema);
 
module.exports = PrivacyPolicy;