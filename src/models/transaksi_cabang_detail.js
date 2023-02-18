const { STRING, DOUBLE, TEXT, ENUM, INTEGER, DATEONLY, INET } = require("sequelize");
const database = require("../../database");

const transaksi_cabang_detail = database.define(
  "transaksi_cabang_detail",
  {
    uuid: {
      type: TEXT,
      unique: true,
      allowNull: false,
    },
    transaksiCabangId: {
      type: STRING(100),
      allowNull: false,
      unique: false,
      validate: {
        notNull: true,
      },
    },
    productId: { type: STRING(100), allowNull: false },
    qty: { type: INTEGER, allowNull: false },
    price: { type: INTEGER, allowNull: false },
    discount: { type: INTEGER, allowNull: true },
    subtotal: { type: INTEGER, allowNull: false },
  },
  { timestamps: true, freezeTableName: true }
);

transaksi_cabang_detail.sync({force:false});

module.exports = transaksi_cabang_detail;
