const sequelize = require("sequelize");

const DB_NAME = "optik_150k2";
const DB_USER = "root";
const DB_PASS = "";
const DB_HOST = "localhost";

const Database = () => {
  return new sequelize(DB_NAME, DB_USER, DB_PASS, {
    dialect: "mysql",
    host: DB_HOST,
    port: 3306,
    dialectOptions: {
      // useUTC: false, //for reading from database
      dateStrings: true,
      typeCast: true,
      timezone: "+07:00",
    },
    timezone: "+07:00",
    operatorsAliases: false,
  });
};

module.exports = Database();
