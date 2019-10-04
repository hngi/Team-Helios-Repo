"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _passport = _interopRequireDefault(require("passport"));

var _users = _interopRequireDefault(require("../models/users"));

var LocalStrategy = require('passport-local').Strategy;

var FacebookStrategy = require('passport-facebook').Strategy;

//Serialize user
_passport["default"].serializeUser(function (user, done) {
  done(null, user.id);
}); //Deserialize user


_passport["default"].deserializeUser(function (id, done) {
  _users["default"].findById(id, function (err, user) {
    done(err, user);
  });
}); //Local Strategy


_passport["default"].use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, function (email, password, done) {
  _users["default"].findOne({
    email: email
  }, function (err, user) {
    if (err) return done(err);
    if (!user) return done(null, false, {
      message: 'Incorrect Username'
    });
    user.comparePassword(password, function (err, isMatch) {
      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false, {
          message: 'Incorrect password.'
        });
      }
    });
  });
}));

_passport["default"].use(new FacebookStrategy({
  clientID: "484024792328223",
  clientSecret: "49a6b7fc5c4325791695fa7e81dc7986",
  callbackURL: "/auth/facebook/callback",
  profileFields: ['id', 'displayName', 'photos', 'email']
}, function (accessToken, refreshToken, profile, done) {
  process.nextTick(function () {
    _users["default"].findOne({
      email: profile.emails[0].value
    }, function (err, user) {
      if (err) return done(err);
      if (user) return done(null, user);else {
        var payload = {
          email: profile.emails[0].value,
          name: profile.displayName.split(" ").join('-').toLowerCase()
        };
        var newUser = new _users["default"](payload);
        newUser.save(function (err, user) {
          if (err) throw err;
          return done(null, newUser);
        });
      }
    });
  });
}));

module.exports = _passport["default"];
//# sourceMappingURL=passport.js.map