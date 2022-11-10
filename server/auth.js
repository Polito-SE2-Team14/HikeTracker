const passport = require('passport');
const LocalStrategy = require('passport-local');


// Passport: set-up the local strategy
passport.use(new LocalStrategy(async function verify(username, password, cb) {

    if (!validateEmail(username)) {
      return cb("Invalid Email")
    }
  
    if (String(password).length <= 6) {
      return cb("Invalid password")
    }
  
    const user = null
    if (!user)
      return cb(null, false);
    return cb(null, user);
  }));
  
  passport.serializeUser(function (user, cb) {
    cb(null, user);
  })
  
  passport.deserializeUser(function (user, cb) {
    return cb(null, user);
  })
  
  app.use(session({
    secret: 'secret string',
    resave: false,
    saveUninitialized: false,
  }));
  app.use(passport.authenticate('session'));
  
  
  const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    return res.status(401).json({ error: 'Not authorized' });
  }