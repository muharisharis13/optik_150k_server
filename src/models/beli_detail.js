const { STRING, TEXT, DATEONLY, INTEGER } = require("sequelize");
const database = require("../../database");

const beli_detail = database.define(
  "beli_detail",
  {
    uuid: {
      type: TEXT,
      unique: true,
      allowNull: false,
    },
    beli_faktur: {
      type: STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        notNull: true,
      },
    },
    productCode: {
      type: STRING(100),
      allowNull: false,
    },
    price: {
      type: INTEGER,
      allowNull: false,
    },
    qty: {
      type: INTEGER,
      allowNull: false,
    },
    total: {
      type: INTEGER,
      allowNull: false,
    },
  },
  { timestamps: true, freezeTableName: true }
);

beli_detail.sync();

module.exports = beli_detail;
