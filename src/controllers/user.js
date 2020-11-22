import crypto from "crypto";
import db from "../models";
import passport from "passport";
import Express from "express";

const User = Express.Router();

User.post("/", async function (req, res) {
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

    console.log(addressCity);

    // Encrypt Password with Crypto ------>

    const algorithm = "aes-256-cbc";
    const key = "GOL$&H3@V00NG7%8J9FF7^-27HJ^72(K";
    const iv = crypto.randomBytes(16);

    const encrypt = (password) => {
      let pixosKey = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
      let encrypted = pixosKey.update(password);

      encrypted = Buffer.concat([encrypted, pixosKey.final()]);
      return {
        iv: iv.toString("hex"),
        encryptedData: encrypted.toString("hex"),
      };
    };

    const hashPass = encrypt(password);

    // ------------------------------------>
    // console.log("DBBBBB->>>>> ", db);

    const inputRegister = await db.pxs_users.create({
      username: username,
      password: hashPass.encryptedData,
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

// exports.login = (req, res, next) => {
//   passport.authenticate("local", (error, user, info) => {
//     if (error) {
//       return res.json({
//         status: 401,
//         message: "Error Authentication",
//         data: error,
//       });
//     }

//     if (!user) {
//       return res.json({
//         status: 400,
//         message: "Email or Password incorrect",
//         data: error,
//       });
//     }

//     return res.json({
//       status: 200,
//       message: "Success, you've been logged in ",
//       data: user,
//     });
//   })(req, res, next);
// };

// exports.logout = (req, res, next) => {
//   req.logout();
//   return res.json({
//     status: 200,
//     message: "Success, you've been logged out",
//     data: {},
//   });
// };

export default User;
