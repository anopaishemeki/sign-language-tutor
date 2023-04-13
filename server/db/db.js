const Sequelize = require("sequelize");
const pkg = require("../../package.json");

const databaseName =
    pkg.name + (process.env.NODE_ENV === "test" ? "-test" : "");

const config = {
    logging: false,
};

if (process.env.LOGGING === "true") {
    delete config.logging;
}

//https://stackoverflow.com/questions/61254851/heroku-postgres-sequelize-no-pg-hba-conf-entry-for-host
if (process.env.DATABASE_URL) {
    config.dialectOptions = {
        ssl: {
            rejectUnauthorized: false,
        },
    };
}

const user = "postgres";
const host = "localhost";
const database = "test";
const port = "5432";
const password = "root"
const db = new Sequelize(/*
  process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`,
  config*/
    database, user, password, {
        host,
        port,
        dialect: "postgres",
        logging: false,
    }
);
module.exports = db;
