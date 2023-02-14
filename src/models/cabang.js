const { STRING, TEXT } = require("sequelize");
const database = require("../../database");

const cabang = database.define(
  "cabang",
  {
    uuid: {
      type: TEXT,
      unique: true,
      allowNull: false,
    },
    nama_cabang: {
      type: STRING(100),
      allowNull: false,
      unique: false,
      validate: {
        notNull: true,
      },
    },
    alamat : {
        type: TEXT,
        allowNull: false,
        unique: false,
        validate: {
          notNull: true,
        },
    }
  },
  { timestamps: true, freezeTableName: true }
);

cabang.sync();

module.exports = cabang;
