const { STRING,  TEXT } = require("sequelize");
const database = require("../../database");

const cara_bayar = database.define(
  "cara_bayar",
  {
    uuid: {
      type: TEXT,
      unique: true,
      allowNull: false,
    },
    cara_bayar_name: {
      type: STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        notNull: true,
      },
    },
  },
  { timestamps: true, freezeTableName: true }
);

cara_bayar.sync()

module.exports = cara_bayar
