const { STRING, DOUBLE, TEXT, ENUM, INTEGER, DATEONLY, INET } = require("sequelize");
const database = require("../../database");

const transaksi_detail = database.define(
  "transaksi_detail",
  {
    uuid: {
      type: TEXT,
      unique: true,
      allowNull: false,
    },
    transaksiNo: {
      type: STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        notNull: true,
      },
    },
    productCode: { type: STRING(100), allowNull: false },
    qty: { type: INTEGER, allowNull: false },
    discount: { type: INTEGER, allowNull: false },
    total: { type: INTEGER, allowNull: false },
  },
  { timestamps: true, freezeTableName: true }
);

transaksi_detail.sync();

module.exports = transaksi_detail;
