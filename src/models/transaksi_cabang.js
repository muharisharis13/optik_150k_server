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
const cabangModel = require("./cabang");

const transaksi_cabang = database.define(
  "transaksi_cabang",
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
    total_transaksi_cabang: { type: INTEGER, allowNull: false },
    uang1: { type: INTEGER, allowNull: false },
    uang2: { type: INTEGER, allowNull: false },
    uang_total: { type: INTEGER, allowNull: false },
    cabangId: { type: INTEGER, allowNull: false },
    payment_method1: { type: STRING(100), allowNull: false },
    payment_method2: { type: STRING(100), allowNull: true },
    discount: { type: INTEGER, allowNull: true },
    surat_jalan: { type: STRING(100), allowNull: true },
    notes: { type: TEXT, allowNull: true },
    transaksi_status: {
      type: ENUM(["COMPLETE", "CANCEL", "DP", "KREDIT"]),
      allowNull: false,
    },
  },
  { timestamps: true, freezeTableName: true }
);

transaksi_cabang.sync({ force: false, alter: false });

cabangModel.hasMany(transaksi_cabang, {
  foreignKey: "cabangId",
});

transaksi_cabang.belongsTo(cabangModel);

module.exports = transaksi_cabang;
