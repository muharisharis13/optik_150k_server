const { STRING,  TEXT,DATE , INTEGER } = require("sequelize");
const database = require("../../database");

const beli = database.define(
  "beli",
  {
    uuid: {
      type: TEXT,
      unique: true,
      allowNull: false,
    },
    no_faktur_beli: {
      type: STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        notNull: true,
      },
    },
    beli_tanggal:{
        type:DATE,
        allowNull : false
    },
    supplierId:{
        type:INTEGER,
        allowNull: false
    }
  },
  { timestamps: true, freezeTableName: true }
);

beli.sync({force:false})

module.exports = beli
