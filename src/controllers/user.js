require("dotenv").config({ path: __dirname + "/../../.env" });
import crypto from "crypto";
import db from "../models";
import passport from "passport";
import Express from "express";
import jwt from "jsonwebtoken";

const User = Express.Router();

User.post("/register", async function (req, res) {
  try {
    const {
      username,
      password,
      email,
      fullname,
      phoneNumber,
      address,
      addressDistrict,
      addressCity,
      addressProvince,
    } = req.body;

    // Encrypt Password with Crypto ------>

    const encrypt = (password) => {
      const iv = crypto.randomBytes(16);

      let cipher = crypto.createCipheriv(
        process.env.ALGORITHM,
        Buffer.from(process.env.KEY),
        iv
      );
      let encrypted = cipher.update(password);

      encrypted = Buffer.concat([encrypted, cipher.final()]);
      return iv.toString("hex") + ":" + encrypted.toString("hex");
    };

    const hashPass = encrypt(password);

    // ------------------------------------>

    const inputRegister = await db.pxs_users.create({
      username: username,
      password: hashPass,
      email: email,
      fullname: fullname,
      phone_number: phoneNumber,
      address: address,
      address_district: addressDistrict,
      address_city: addressCity,
      address_province: addressProvince,
    });

    res
      .status(200)
      .json({
        status: "Success",
        message: "Register Up!!",
        data: inputRegister,
      })
      .end();
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({
        status: "error",
        message: error.messages,
        data: {},
      })
      .end();
  }
});

User.post("/login", async function (req, res, next) {
  try {
    passport.authenticate("local", { session: false }, (error, user, info) => {
      // console.log("AUTH ------->", error);
      if (error) {
        return res.status(400).json({
          status: "error",
          message: "Error Authentication",
          data: error,
        });
      }

      if (!user) {
        return res.status(400).json({
          status: "error",
          message: "Email or Password incorrect",
          data: error,
        });
      }

      // let payload = { id: user.id };
      // let token = jwt.sign(payload, jwtOptions.secretOrKey);
      const body = { id: user.id, email: user.email };
      const token = jwt.sign({ user: body }, process.env.JWT_KEY, {
        expiresIn: "24h",
      });

      console.log(token);

      return res.status(200).json({
        status: "success",
        message: "Success, you've been logged in ",
        data: { profile: user, token: token },
      });
    })(req, res, next);
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({
        status: "error",
        message: error.messages,
        data: {},
      })
      .end();
  }
});

User.post("/logout", async function (req, res, next) {
  try {
    req.logout();
    return res.json({
      status: 200,
      message: "Success, you've been logged out",
      data: {},
    });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({
        status: "error",
        message: error.messages,
        data: {},
      })
      .end();
  }
});

export default User;
