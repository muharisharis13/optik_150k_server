const {
  STRING,
  DOUBLE,
  TEXT,
  ENUM,
  INTEGER,
  DATEONLY,
  INET,
} = require("sequelize");
const TransaksiModel = require("./transaksi");
const database = require("../../database");
const product = require("./product");

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
    price: { type: INTEGER, allowNull: false },

    notes: { type: TEXT, allowNull: true },
    qty: { type: INTEGER, allowNull: false },
    discount: { type: INTEGER, allowNull: true },
    subtotal: { type: INTEGER, allowNull: false },
  },
  { timestamps: true, freezeTableName: true }
);

transaksi_detail.sync({ force: false });

product.hasMany(transaksi_detail, {
  foreignKey: "productId",
});

TransaksiModel.hasMany(transaksi_detail, {
  foreignKey: "transaksiId",
});

transaksi_detail.belongsTo(product);

transaksi_detail.belongsTo(TransaksiModel);

module.exports = transaksi_detail;
