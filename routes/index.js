var express = require('express');
var router = express.Router();

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
    res.render('thank', { title: 'CodeTogether - a platform for sharing code.'});
});

module.exports = router;
