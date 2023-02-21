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

transaksi_detail.sync({ force: false, alter: false });

product.hasMany(transaksi_detail, {
  foreignKey: "productId",
});

transaksi_detail.belongsTo(product);

module.exports = transaksi_detail;
