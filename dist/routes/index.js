const express = require('express');

const auth = require('../config/auth');

const flash = require('express-flash');

const Expenses = require('../models/expenses');

const router = express.Router();
router.use(async (req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  res.locals.userExpenses = typeof req.user == 'undefined' ? null : await Expenses.find({
    user: req.user.id
  }).populate('user').sort({
    createdAt: -1
  });
  next();
});

function checkLoggedIn(req, res, next) {
  if (req.isAuthenticated()) res.redirect('back');else {
    next();
  }
} // Get index page


router.get('/', (req, res, next) => {
  if (req.isAuthenticated()) {
    res.redirect('/home');
  } else {
    res.render('index');
  }
});
router.get('/signup', checkLoggedIn, (req, res, next) => {
  res.render('sign-up');
});
router.get('/faq', (req, res, next) => {
  res.render('faq');
});
router.get('/home', auth, (req, res, next) => {
  res.render('home');
});
module.exports = router;
//# sourceMappingURL=index.js.map