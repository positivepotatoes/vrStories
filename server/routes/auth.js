const express = require('express');
const middleware = require('../middleware');
const router = express.Router();

// EDITED BY DAVID
// want to delete below
// router.route('/')
//   .get(middleware.auth.verify, (req, res) => {
//     res.render('index.ejs');
//   });

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
      user: req.user // get the user out of session and pass to template
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

// USE FOR LOCAL LOGIN/SIGN UP
//
// router.route('/login')
//   .get((req, res) => {
//     console.log('in /login')
//     res.render('login.ejs', { message: req.flash('loginMessage') });
//   })
//   .post(middleware.passport.authenticate('local-login', {
//     successRedirect: '/profile',
//     failureRedirect: '/login',
//     failureFlash: true
//   }));

// router.route('/signup')
//   .get((req, res) => {
//     res.render('signup.ejs', { message: req.flash('signupMessage') });
//   })
//   .post(middleware.passport.authenticate('local-signup', {
//     successRedirect: '/profile',
//     failureRedirect: '/signup',
//     failureFlash: true
//   }));
