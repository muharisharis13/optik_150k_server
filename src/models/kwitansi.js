const { STRING, TEXT, INTEGER } = require("sequelize");
const database = require("../../database");

const kwitansi = database.define(
  "kwitansi",
  {
    uuid: {
      type: TEXT,
      unique: true,
      allowNull: false,
    },
    kwitansi_code: {
      type: STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        notNull: true,
      },
    },
    amount: {
      type: INTEGER,
      allowNull: false,
    },
    price: {
      type: INTEGER,
      allowNull: false,
    },
    employee: {
      type: STRING(100),
      allowNull: false,
    },
  },
  { timestamps: true, freezeTableName: true }
);

kwitansi.sync();

module.exports = kwitansi;
