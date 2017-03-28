//expose routes to the app
module.exports = function(app, passport) {
  //Check wether or not request is authenticated and store into variable
  app.use(function(req, res, next) {
    res.locals.login = req.isAuthenticated();
    next();
  });

  app.get('/', function(req, res) {
      //change welcome message
      if(!req.isAuthenticated()){
        res.render('index.ejs', { welcomeMessage: -1 });
      }else {
        res.render('index.ejs', {
            welcomeMessage: req.user.first_name
        });
      }
  });

  app.get('/login', function(req, res) {
      if(req.isAuthenticated()){
        res.redirect('/');
      } else{
        //login with error message
        res.render('login.ejs', { message: req.flash('loginMessage') });
      }
  });

  app.post('/login', passport.authenticate('local-login', {
      successRedirect : '/',
      failureRedirect : '/login',
      failureFlash : true
  }));

  app.get('/signup', function(req, res) {
    if(req.isAuthenticated()){
      res.redirect('/');
    } else{
      //sign up with error message
      res.render('signup.ejs', { message: req.flash('loginMessage') });
    }
  });

  app.post('/signup', passport.authenticate('local-signup', {
      successRedirect : '/',
      failureRedirect : '/signup',
      failureFlash : true
  }));

  app.get('/logout', function(req, res) {
      req.logout();
      res.redirect('/');
  });

  app.get('/nutrition', function(req, res) {
      res.render('nutritionSearch.ejs');
  });
};
