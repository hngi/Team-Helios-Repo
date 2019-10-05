"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _passport = _interopRequireDefault(require("passport"));

var _users = _interopRequireDefault(require("../models/users"));

var LocalStrategy = require('passport-local').Strategy;

var GoogleStrategy = require('passport-google-oauth20').Strategy;

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

_passport["default"].use(new GoogleStrategy({
  clientID: "1039166944193-st34fsrpgqd02eocno2ouog9teutr1rf.apps.googleusercontent.com",
  clientSecret: "V0ElXoVRVA5-5ktT8MaiZe5y",
  callbackURL: "/auth/google/callback"
}, function (accessToken, refreshToken, profile, done) {
  process.nextTick(function () {
    _users["default"].findOne({
      email: profile.emails[0].value
    }, function (err, user) {
      if (err) return done(err);
      if (user) return done(null, user);else {
        console.log(profile);
        var payload = {
          email: profile.emails[0].value,
          name: profile.displayName.split(" ").join('-').toLowerCase(),
          profilePicture: profile.photos[0].value,
          active: true,
          provider: profile.provider,
          googleId: profile.id
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