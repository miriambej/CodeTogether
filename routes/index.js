var express = require('express');
var router = express.Router();

var nodemailer = require ('nodemailer');
var config = require('../config');
var transporter = nodemailer.createTransport(config.mailer); //we are going to pass the config.mailer to the createTransport. The config mailer comes from config.js folder.

/* GET home page. */
// req = request, res = respond
router.get('/', function(req, res, next) {
  res.render('index', { title: 'CodeTogether - a platform for sharing code.' });
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'CodeTogether - a platform for sharing code.' });
});

// contact as well as getting, we need to post.
router.route('/contact')
  .get(function(req, res, next) {
    res.render('contact', { title: 'CodeTogether - a platform for sharing code.'});
  })
  // when you click submit, it runs the post request and renders thank page.
  .post(function(req, res, next) {
    req.checkBody('name', 'Empty Name').notEmpty();
    req.checkBody('email', 'Invalid Email').isEmail();
    req.checkBody('message', 'Empty Message').notEmpty();
    var errors = req.validationErrors();

    if(errors) {
      res.render('contact', {
        title: 'CodeTogether - a platform for sharing code.',
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
        errorMessages: errors
      });
    } else {
      var mailOptions = {
        from: 'CodeTogether <no-reply@CodeTogether.com',
        to: 'heroku.miriam23@gmail.com',
        subject: 'You got a new message from visitor 🦋 😽',
        text: req.body.message
      };

      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          return console.log(error);
        }
        res.render('thank', { title: 'CodeTogether - a platform for sharing code.'});
      });
    }
  });

module.exports = router;
