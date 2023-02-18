const { STRING, TEXT, DATEONLY, INTEGER } = require("sequelize");
const database = require("../../database");

const beli_detail = database.define(
  "beli_detail",
  {
    uuid: {
      type: TEXT,
      unique: true,
      allowNull: false,
    },
    beliId: {
      type: STRING(100),
      allowNull: false,
      unique: false,
      validate: {
        notNull: true,
      },
    },
    productId: {
      type: STRING(100),
      allowNull: false,
    },
    price: {
      type: INTEGER,
      allowNull: false,
    },
    qty: {
      type: INTEGER,
      allowNull: false,
    },
    subtotal: {
      type: INTEGER,
      allowNull: false,
    },
  },
  { timestamps: true, freezeTableName: true }
);

beli_detail.sync({force:false});

module.exports = beli_detail;
