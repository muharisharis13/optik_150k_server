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

const transaksi_cabang = database.define(
  "transaksi_cabang",
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
    transaksi_date: { type: DATEONLY, allowNull: false },
    total: { type: INTEGER, allowNull: false },
    uang1: { type: INTEGER, allowNull: false },
    uang2: { type: INTEGER, allowNull: false },
    uang_total: { type: INTEGER, allowNull: false },
    kurang_total: { type: INTEGER, allowNull: false },
    kembalian_total: { type: INTEGER, allowNull: false },
    uuid_cabang: { type: STRING(100), allowNull: false },
    payment_method1: { type: STRING(100), allowNull: false },
    payment_method2: { type: STRING(100), allowNull: true },
    discount: { type: INTEGER, allowNull: false },
    surat_jalan: { type: STRING(100), allowNull: true },
    transaksi_status: {
      type: ENUM(["COMPLETE", "CANCEL", "DP", "KREDIT"]),
      allowNull: false,
    },
  },
  { timestamps: true, freezeTableName: true }
);

transaksi_cabang.sync();

module.exports = transaksi_cabang;
