require("dotenv").config({ path: __dirname + "/../../.env" });
import db from "../models";
import crypto from "crypto";
import passportJWT from "passport-jwt";

const LocalStrategy = require("passport-local").Strategy;

let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;

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

  let jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_KEY,
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
            return done(null, false, { message: "User not found" });
          }

          const decryptPassword = decrypt(user.password);

          if (decryptPassword !== password) {
            return done(null, false, { message: "Wrong Password" });
          }

          return done(null, user);
        })
        .catch((error) => {
          return done(error);
        });
    })
  );

  // lets create our strategy for web token

  let strategy = new JwtStrategy(jwtOptions, (jwt_payload, done) => {
    User.findOne({ where: { id: jwt_payload.id } })
      .then((user) => {
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      })
      .catch((err) => console.log(err));
  });
  // new JwtStrategy(jwtOptions, async (token, done) => {
  // try {
  //   return done(null, token.user);
  // } catch (error) {
  //   done(error);
  // }
  // });

  // let user = getUser({ id: jwt_payload.id });
  // if (user, done) {
  //   next(null, user);
  // } else {
  //   next(null, false);
  // }

  // use the strategy
  passport.use(strategy);
};

export default authConfig;
