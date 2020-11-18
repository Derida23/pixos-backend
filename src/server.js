require("dotenv").config({ path: __dirname + "/../.env" });
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import db from "./models";
import session from "express-session";
import { sessionStore, expireDate } from "./helper/passport";

var passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;

const app = express();

// Handle Functiona Passport Js ------>

app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSIONSDB_SECRET,
    store: sessionStore,
    cookie: { expires: expireDate },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// ------------------------------------>

let corsOptions = {
  origin: "http://localhost: 8081",
};

app.use(cors(corsOptions));
db.sequelize.sync();

// parse request of content type application/json
app.use(bodyParser.json());

// parse request of content type form urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to PIXOS - point of sale application" });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`PIXOS Server is Running on port : ${PORT}`);
});
