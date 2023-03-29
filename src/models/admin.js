const { STRING, ENUM, TEXT, BOOLEAN } = require("sequelize");
const database = require("../../database");

const admin = database.define(
  "admin",
  {
    uuid: {
      type: TEXT,
      unique: true,
      allowNull: false,
    },
    username: {
      type: STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        notNull: true,
      },
    },
    password: { type: STRING(100), allowNull: false },
    role: {
      type: ENUM(["pembelian", "penjualan", "kasir", "admin"]),
      allowNull: false,
    },
    name: { type: STRING(100), allowNull: false },
    active: {
      type: BOOLEAN,
      defaultValue: true,
    },
  },
  { timestamps: true, freezeTableName: true }
);

admin.sync({
  alter: true,
});

module.exports = admin;
