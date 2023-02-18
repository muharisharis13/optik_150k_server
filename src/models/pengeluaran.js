const { STRING, TEXT, INTEGER, DATE } = require("sequelize");
const database = require("../../database");

const pengeluaran = database.define(
  "pengeluaran",
  {
    uuid: {
      type: TEXT,
      unique: true,
      allowNull: false,
    },
    jenis_pengeluaran: {
      type: STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        notNull: true,
      },
    },
    amount: {
      type: INTEGER,
      allowNull: false,
    },
    keterangan: {
      type: TEXT,
      allowNull: false,
    },
    employee: {
      type: STRING(100),
      allowNull: false,
    },
  },
  { timestamps: true, freezeTableName: true }
);

pengeluaran.sync({ force: true });

module.exports = pengeluaran;
