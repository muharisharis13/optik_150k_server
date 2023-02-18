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
    transaksiId: {
      type: STRING(100),
      allowNull: false,
    },
    productId: { type: STRING(100), allowNull: false },
    price:{type:INTEGER,allowNull:false},
    qty: { type: INTEGER, allowNull: false },
    discount: { type: INTEGER, allowNull: true },
   subtotal: { type: INTEGER, allowNull: false },
  },
  { timestamps: true, freezeTableName: true }
);

transaksi_detail.sync({force:false});

module.exports = transaksi_detail;
