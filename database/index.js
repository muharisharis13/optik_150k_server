const sequelize = require("sequelize");

const DB_NAME = "optik_150k";
const DB_USER = "root";
const DB_PASS = "";
const DB_HOST = "localhost";

const Database = () => {
  return new sequelize(DB_NAME, DB_USER, DB_PASS, {
    dialect: "mysql",
    host: DB_HOST,
    port:3306
  });
};

module.exports = Database();
