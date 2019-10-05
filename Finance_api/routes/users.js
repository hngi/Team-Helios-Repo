const express = require("express");
const router = express.Router();
const User = require('../models/users');
const passport = require('../config/passport');

// Load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
// Load User model

router.post("/register", async (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    if (errors.name !== undefined) req.flash('success_msg', errors.name);
    if (errors.email !== undefined) req.flash('success_msg', errors.email);
    if (errors.password !== undefined) req.flash('success_msg', errors.password);
    if (errors.password2 !== undefined) req.flash('success_msg', errors.password2);
    return res.redirect('back');
  }

  const check = await User.findOne({ email: req.body.email });
  if (check) {
    req.flash('success_msg', 'Email already in use');
    return res.redirect('back');
  }

  await User.create(req.body);
  req.flash('success_msg', 'Account created successfully, you can now login');
  return res.redirect('/');
});

router.post("/login", async (req, res, next) => {
  passport.authenticate('local', function (err, user, info) {
    if (err) return next(err)
    if (!user) {
      req.flash('success_msg', 'Incorect Email or password');
      return res.redirect('back');
    }
    req.logIn(user, function (err) {
      if (err) return next(err);
      return res.redirect('/home');
    });
  })(req, res, next);
});

// Facebook Login auth
router.get('/auth/google', passport.authenticate('google', { scope: ['profile','email'] }));
router.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: '/',
    successRedirect: '/home'
}));

module.exports = router;
