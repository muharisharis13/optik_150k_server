const { STRING, TEXT } = require("sequelize");
const database = require("../../database");

const supplier = database.define(
  "supplier",
  {
    uuid: {
      type: TEXT,
      unique: true,
      allowNull: false,
    },
    supplier_name: {
      type: STRING(200),
      allowNull: false,
      unique: true,
      validate: {
        notNull: true,
      },
    },
    supplier_address: {
      type: TEXT,
      allowNull: false,
    },
    supplier_phone: {
      type: STRING(15),
      allowNull: false,
    },
  },
  { timestamps: true, freezeTableName: true }
);

supplier.sync();

module.exports = supplier;
