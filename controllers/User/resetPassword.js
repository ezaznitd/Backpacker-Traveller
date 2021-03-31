const connectDB = require('../../database/connectDB');
const State = require('../../database/models/State');
const User = require('../../database/models/User');
const crypto = require('crypto');
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ezazhossain615@gmail.com',
      pass: 'Hossain80039'
    }
});

module.exports = async (req, res) => {
    connectDB.databaseConnection;
    const states = await State.find({});
    crypto.randomBytes(32, (err, buffer) => {
        if (err) {
            console.log(err);
        }
        const token = buffer.toString("hex");
        User.findOne({email: req.body.email})
        .then(user => {
            if (!user) {
                req.flash('danger', 'Youser does not exist');
                res.redirect('/reset-user-password');
            }
            user.resetToken = token;
            user.expireToken = Date.now() + 3600000;
            user.save().then((result) => {
                transporter.sendMail({
                    to: user.email,
                    from: "no-reply@gmail.com",
                    subject: "[Backpacker Traveller] acoount password reset request",
                    html: `
                    <h3>Dear ${user.username},</h3>
                    <h3>We have received a request for updating your account password on <strong>Backpacker Traveller</strog>. Please click the below link to reset your password.</h3>
                    <h3>Password reset link: <a href="http://localhost:4000/new-password-${token}">${token}</a></h3>
                    <h3>Thank you</h3>
                    <h3>Backpacker Team</h3>
                    <h3>Please ignore this mail in case the reset password request does not pertain to you.</h3>
                    `
                })
                req.flash('info', 'You have sent a reset password link to your regitered email id!');
                res.redirect('/');
            })
        })
    })
}