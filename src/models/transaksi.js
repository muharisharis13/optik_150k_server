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
const customer = require("./customer");

const transaksi = database.define(
  "transaksi",
  {
    uuid: {
      type: TEXT,
      unique: true,
      allowNull: false,
    },
    no_faktur: {
      type: STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        notNull: true,
      },
    },
    transaksi_status: {
      type: ENUM(["COMPLETE", "CANCEL", "DP", "CREDIT"]),
      allowNull: false,
    },
    total_transaksi: { type: INTEGER, allowNull: false },
    uang1: { type: INTEGER, allowNull: false },
    uang2: { type: INTEGER, allowNull: false, defaultValue: 0 },
    total_uang: { type: INTEGER, allowNull: false },
    customerId: { type: STRING(100), allowNull: false },
    payment_method1: { type: STRING(100), allowNull: false },
    payment_method2: { type: STRING(100), allowNull: true },
    discount: { type: INTEGER, allowNull: true },
    notes: { type: TEXT, allowNull: true },
  },
  { timestamps: true, freezeTableName: true }
);

transaksi.sync({ force: false, alter: false });

customer.hasMany(transaksi, {
  foreignKey: "customerId",
});

transaksi.belongsTo(customer);
module.exports = transaksi;
