const express = require('express');
const middleware = require('../middleware');
const router = express.Router();

router.route('/verify')
  .get((req, res) => {
    res.send(req.isAuthenticated());
  });

router.route('/fetch')
  .get((req, res) => {
    var response = {
      user: req.user
    };
    res.send(response);
  });

router.route('/login')
  .get((req, res) => {
    res.redirect('/auth/facebook');
  });

router.route('/profile')
  .get(middleware.auth.verify, (req, res) => {
    res.render('profile.ejs', {
      user: req.user
    });
  });

router.route('/logout')
  .get((req, res) => {
    req.logout();
    res.redirect('/');
  });

router.get('/auth/facebook', middleware.passport.authenticate('facebook', {
  scope: ['public_profile', 'email', 'user_friends']
}));

router.get('/auth/facebook/callback', middleware.passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

module.exports = router;
