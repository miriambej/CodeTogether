var express = require('express');
var router = express.Router();

router.get('/createTask', function(req, res) {
  var newTask = new Task();

  newTask.save(function( err, data) {
    if (err) {
      console.log(err);
      res.render('error'); //error page from views
    } else {
      res.redirect('/task/' + data._id); //if you create a task succressully it is going to redirect to task with id.
    }
  })
});

router.get('/task/:id', function(req, res) {
  //if it can find the params.id in the link, it's going to look in the database in the task table and it is going to search for any data having the _id equal the id  that is passing through , and if it ca get it, it will return it into data variable.
  if (req.params.id) {
    Task.findOne({_id: req.params.id}, function(err, data) {
      if (err) {
        console.log(err);
        res.render('error');
      }
      if (data) {
        res.render('task', {data: data});
      }else {
        res.render('error');
      }
    })
  } else {
    res.render('error');
  }
})

module.exports = router;
