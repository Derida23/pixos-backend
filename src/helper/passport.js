require("dotenv").config({ path: __dirname + "/../../.env" });
import db from "../models";
import crypto from "crypto";

const LocalStrategy = require("passport-local").Strategy;

const authConfig = (passport) => {
  const decrypt = (text) => {
    let textParts = text.split(":");
    let iv = Buffer.from(textParts.shift(), "hex");
    let encryptedText = Buffer.from(textParts.join(":"), "hex");
    let decipher = crypto.createDecipheriv(
      process.env.ALGORITHM,
      Buffer.from(process.env.KEY),
      iv
    );
    let decrypted = decipher.update(encryptedText);

    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();
  };

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    db.pxs_users
      .findOne({
        where: {
          id: id,
        },
      })
      .then((user) => {
        done(null, user);
      })
      .catch((error) => {
        done(error, null);
      });
  });

  passport.use(
    new LocalStrategy({ usernameField: "email" }, (user, password, done) => {
      db.pxs_users
        .findOne({
          where: {
            username: user,
          },
        })
        .then((user) => {
          if (!user) {
            return done(null, false);
          }

          const decPass = decrypt(user.password);

          if (decPass !== password) {
            return done(null, false);
          }

          return done(null, user);
        })
        .catch((error) => {
          return done(error);
        });
    })
  );
};

export default authConfig;
