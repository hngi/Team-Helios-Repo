import passport from 'passport';
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20'). Strategy;
import User from '../models/users';

//Serialize user
passport.serializeUser((user, done) => {
  done(null, user.id)
})

//Deserialize user
passport.deserializeUser((id, done) => { User.findById(id, (err, user) => { done(err, user) }) });

//Local Strategy
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, (email, password, done) => {
  User.findOne({ email: email }, (err, user) => {
      if (err) return done(err);
      if (!user) return done(null, false, { message: 'Incorrect Username' });
      user.comparePassword(password, (err, isMatch) => {
          if (isMatch) {
              return done(null, user);
          } else {
              return done(null, false, { message: 'Incorrect password.' });
          }
      })
  })
}))

passport.use(new GoogleStrategy({
    clientID: "1039166944193-st34fsrpgqd02eocno2ouog9teutr1rf.apps.googleusercontent.com",
    clientSecret: "V0ElXoVRVA5-5ktT8MaiZe5y",
    callbackURL: "/auth/google/callback",
  }, function (accessToken, refreshToken, profile, done) {
    process.nextTick(() => {
        User.findOne({ email: profile.emails[0].value }, (err, user) => {
            if (err)
                return done(err);
            if (user)
                return done(null, user);
            else {
                console.log(profile)
                let payload = {
                    email: profile.emails[0].value,
                    name: profile.displayName.split(" ").join('-').toLowerCase(),
                    profilePicture: profile.photos[0].value,
                    active: true,
                    provider:profile.provider,
                    googleId: profile.id
                };
                let newUser = new User(payload);
                newUser.save((err, user) => {
                    if (err)
                        throw err;
                    return done(null, newUser);
                })
            }
        });
    });
  }
  ));

module.exports = passport;