require("dotenv").config({ path: __dirname + "/../../.env" });
import mysql from "mysql";
import session from "express-session";
var MySQLStore = require("express-mysql-session")(session);

var connection = mysql.createConnection({
  host: process.env.SESSIONSDB_HOST,
  port: process.env.PORT,
  user: process.env.SESSIONSDB_USER,
  password: "",
  database: process.env.SESSIONSDB_DB,
});

var sessionStore = new MySQLStore(
  {
    checkExpirationInterval: parseInt(
      process.env.SESSIONSDB_CHECK_EXP_INTERVAL,
      10
    ),
    expiration: parseInt(process.env.SESSIONSDB_EXPIRATION, 10),
  },
  connection
);

/* Create a cookie that expires in 1 day */
var expireDate = new Date();
expireDate.setDate(expireDate.getDate() + 1);

export default { connection, sessionStore, expireDate };
