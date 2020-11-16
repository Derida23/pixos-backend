require("dotenv").config({ path: __dirname + "/../../.env" });
import config from "../config.json";
import Sequelize from "sequelize";

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

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// db.pxs_users = require("./pxs_users.model.js")(sequelize, Sequelize);

export default db;
