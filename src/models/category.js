const { STRING,  TEXT } = require("sequelize");
const database = require("../../database");

const category = database.define(
  "category",
  {
    uuid: {
      type: TEXT,
      unique: true,
      allowNull: false,
    },
    category_name: {
      type: STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        notNull: true,
      },
    },
  },
  { timestamps: true, freezeTableName: true }
);

category.sync()

module.exports = category
