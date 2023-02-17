const { STRING,  TEXT, DATEONLY, INTEGER } = require("sequelize");
const database = require("../../database");

const beli = database.define(
  "beli",
  {
    uuid: {
      type: TEXT,
      unique: true,
      allowNull: false,
    },
    beli_faktur: {
      type: STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        notNull: true,
      },
    },
    beli_tanggal:{
        type:DATEONLY,
        allowNull : false
    },
    supplierId:{
        type:INTEGER,
        allowNull: false
    }
  },
  { timestamps: true, freezeTableName: true }
);

beli.sync()

module.exports = beli
