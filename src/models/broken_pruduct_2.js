const { STRING, TEXT, DATEONLY, INTEGER, INET } = require("sequelize");
const database = require("../../database");
const product = require("./product");

const broken_product = database.define(
  "broken_product_2",
  {
    uuid: {
      type: TEXT,
      unique: true,
      allowNull: false,
    },
    productId: {
      type: STRING(100),
      allowNull: false,
    },
    qty: {
      type: INTEGER,
      allowNull: false,
    },
    notes: {
      type: TEXT,
      allowNull: false,
    },
  },
  { timestamps: true, freezeTableName: true }
);

broken_product.sync({ force: false });

product.hasMany(broken_product, {
  foreignKey: "productId",
});

broken_product.belongsTo(product);

module.exports = broken_product;
