var nodemailer = require('nodemailer');
const Subscriber = require('../../database/models/Subscriber');

async function sendEmail (title, description) {
    const subscriber = await Subscriber.find({});
    var list = [];
    for(var i=0; i<subscriber.length;i++){
        list.push(subscriber[i].email);
    }
    var title = title.replace(/<[^>]+>/g, '');
    var description = description.replace(/<[^>]+>/g, '');
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ezazhossain615@gmail.com',
            pass: 'Hossain80039'
        }
    });

    var mailOptions = {
        from: 'ezazhossain615@gmail.com',
        to: list,
        subject: title,
        text: description,
        // attachments: [
        //     { filename: 'Certificate.pdf', path: './Certificate.pdf' } // TODO: replace it with your own image
        // ]
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = { sendEmail };