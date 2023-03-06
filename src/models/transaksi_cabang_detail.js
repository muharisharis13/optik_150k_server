const {
  STRING,
  DOUBLE,
  TEXT,
  ENUM,
  INTEGER,
  DATEONLY,
  INET,
} = require("sequelize");
const database = require("../../database");
const ProductModel = require("./product");
const TransaksiCabangModel = require("./transaksi_cabang");

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
    notes: { type: TEXT, allowNull: true },
    qty: { type: INTEGER, allowNull: false },
    price: { type: INTEGER, allowNull: false },
    discount: { type: INTEGER, allowNull: true },
    subtotal: { type: INTEGER, allowNull: false },
  },
  { timestamps: true, freezeTableName: true }
);

transaksi_cabang_detail.sync({ force: false, alter: false });

ProductModel.hasMany(transaksi_cabang_detail, {
  foreignKey: "productId",
});

TransaksiCabangModel.hasMany(transaksi_cabang_detail, {
  foreignKey: "transaksiCabangId",
});

transaksi_cabang_detail.belongsTo(ProductModel);
transaksi_cabang_detail.belongsTo(TransaksiCabangModel);

module.exports = transaksi_cabang_detail;
