const mongoose = require('mongoose');
const domPurifier = require('dompurify');
const {JSDOM} = require('jsdom');
const htmlPurify = domPurifier(new JSDOM().window);

// const stripHtml = require('string-strip-html');
const { stripHtml } = require('string-strip-html');

const SubscriberSchema = new mongoose.Schema({
	email: {
        type: String,
        required: true,
        unique: true
    },
	snippet: {
		type: String
	}
});

SubscriberSchema.set('timestamps', true);

SubscriberSchema.index({
	email: 'text'
});

SubscriberSchema.pre('validate', function(next) {
	if (this.email) {
		this.email = htmlPurify.sanitize(this.email);
		this.snippet = stripHtml(this.email.substring(0,200)).result;
	}

	next();
})

const Subscriber = mongoose.model('Subscriber', SubscriberSchema);
 
module.exports = Subscriber;