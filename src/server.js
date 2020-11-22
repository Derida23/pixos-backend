require("dotenv").config({ path: __dirname + "/../.env" });
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import db from "./models";

import passport from "passport";
import session from "express-session";
import router from "./routes";
import authConfig from "./helper/passport";
import cookieParser from "cookie-parser";

const app = express();

// parse request of content type application/json
app.use(bodyParser.json());

// parse request of content type form urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Middlewares
app.use(
  session({
    name: "session-id",
    secret: "scret",
    saveUninitialized: false,
    resave: false,
    cookie: {
      expires: 600000,
    },
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());
authConfig(passport);

// Routes
app.use(router);

let corsOptions = {
  origin: "http://localhost: 8081",
};

app.use(cors(corsOptions));
// db.sequelize.sync();

app.get("/", (req, res) => {
  res.json({ message: "Welcome to PIXOS - point of sale application" });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`PIXOS Server is Running on port : ${PORT}`);
});
