const { STRING, ENUM, TEXT } = require("sequelize");
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
  },
  { timestamps: true, freezeTableName: true }
);

admin.sync()

module.exports = admin
