const { STRING, TEXT } = require("sequelize");
const database = require("../../database");

const customer = database.define(
  "customer",
  {
    uuid: {
        type: TEXT,
        unique: true,
        allowNull: false,
      },
    kdCustomer: {
      type: STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        notNull: true,
      },
    },
    customer_name : {
        type: STRING(150),
        allowNull: false,
        unique: false,
        validate: {
          notNull: true,
        },
    }, 
    no_hp : {
        type: STRING(20),
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

customer.sync();

module.exports = customer;
