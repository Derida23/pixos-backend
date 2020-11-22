const LocalStrategy = require("passport-local").Strategy;
const db = require("../models");
const crypto = require("crypto");

const authConfig = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    db.Users.findOne({
      id: id,
    })
      .then((user) => {
        done(null, user);
      })
      .catch((error) => {
        done(error, null);
      });
  });

  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      (username, password, done) => {
        db.Users.findOne({
          email: username,
        })
          .then((user) => {
            if (!user) {
              return done(null, false);
            }

            const iv = crypto.randomBytes(16);

            let pixosKey = crypto.createDecipheriv(
              "aes-256-ccm",
              "GOL$&H3@V00NG7%8J9FF7^-27HJ^72(K",
              iv
            );
            let pixosStr = pixosKey.update(user.password, "hex", "utf8");
            pixosStr += pixosKey.final("utf8");

            if (pixosStr !== password) {
              return done(null, false);
            }

            return done(null, user);
          })
          .catch((error) => {
            return done(error);
          });
      }
    )
  );
};

export default authConfig;
