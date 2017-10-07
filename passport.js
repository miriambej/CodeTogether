var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

//Initialize the session when user login
passport.serializeUser(function(user, done) {
  done(null, user._id);
});

//to accept that session and check if the id equals the id above
passport.deserializeUser(function(id, done) {
  User.findOne({_id: id}, function(err, user) {
    done(err, user);
  })
});

//the username will be unique email
passport.use(new LocalStrategy({
    usernameField: 'email'
  },
  function(username, password, done) {
    User.findOne({email: username}, function(err, user) {
      if(err) return done(err);
      if(!user) {
        return done(null, false, {
          message: 'Incorrect username or password'
        });
      }
      if(!user.validPassword(password)) {
        return done(null, false, {
          message: 'Incorrect username or password'
        });
      }
      return done(null, user);
    })
  }
));
