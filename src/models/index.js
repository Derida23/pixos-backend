require("dotenv").config({ path: __dirname + "/../../.env" });
import config from "../config.json";
import Sequelize from "sequelize";
import fs from "fs";
import path from "path";
let db = {};

const sequelize = new Sequelize(
  config[process.env.MODE].DB,
  config[process.env.MODE].USER,
  config[process.env.MODE].PASSWORD,
  {
    host: config[process.env.MODE].HOST,
    dialect: config[process.env.MODE].dialect,
    operatorAliases: config[process.env.MODE].operatorAliases,
    pool: {
      max: config[process.env.MODE].pool.max,
      min: config[process.env.MODE].pool.min,
      acquire: config[process.env.MODE].pool.acquire,
      idle: config[process.env.MODE].pool.idle,
    },
    define: {
      underscored: true,
      underscoredAll: true,
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
      paranoid: true,
    },
    timezone: "+07:00",
    logging: (a) => {
      if (process.env.MODE === "development") {
        console.log(a);
      }
    },
  }
);

const authenticate = async () => {
  try {
    // if (process.env.DISABLE_DB_LOGGING === "true") {
    //   console.log("DB Logging is disabled :)");
    //   db.options.logging = () => {};
    // }
    await sequelize.authenticate();
  } catch (error) {
    console.error(error);
    await authenticate();
  }
};

authenticate().then((_) => null); //eslint-disable-line

let files = fs.readdirSync(__dirname + "/generated");
// for (let f of files) {
//   if (f.indexOf("index.js") >= 0) continue;
//   sequelize.import("./generated/" + f);
//   console.log(`Loaded Model file ${f}`);
// }

fs.readdirSync(__dirname + "/generated")

  .filter((file) => file !== "index.js")

  .forEach((file) => {
    //const model = sequelize.import(path.join(__dirname, file))

    var model = require(path.join(__dirname + "/generated", file))(
      sequelize,
      Sequelize.DataTypes
    );

    db[model.name] = model;
  });

// console.log("FILE PROJECTOR", db);

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// db.pxs_users = require("./pxs_users.model.js")(sequelize, Sequelize);

export default db;
