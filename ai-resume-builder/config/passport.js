const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const User = mongoose.model("users");

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: "YOUR_GOOGLE_CLIENT_ID",
        clientSecret: "YOUR_GOOGLE_CLIENT_SECRET",
        callbackURL: "/auth/google/callback",
      },
      (accessToken, refreshToken, profile, done) => {
        User.findOne({ googleID: profile.id }).then((user) => {
          if (user) {
            done(null, user);
          } else {
            new User({
              googleID: profile.id,
              name: profile.displayName,
              avatar: profile.photos[0].value,
            })
              .save()
              .then((user) => done(null, user));
          }
        });
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
  });
};
