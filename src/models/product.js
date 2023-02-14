const { STRING, DOUBLE, TEXT,ENUM,INTEGER } = require("sequelize");
const database = require("../../database");
const CategoryModel = require("./category")

const product = database.define(
  "product",
  {
    uuid: {
      type: TEXT,
      unique: true,
      allowNull: false,
    },
    product_code: {
      type: STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        notNull: true,
      },
    },
    product_name: { type: STRING(100), allowNull: false },
    uom: { type:  ENUM(["buah"]), allowNull: false },
    capital_price: { type:DOUBLE, allowNull: false },
    price: { type: DOUBLE, allowNull: false },
    stock: { type: INTEGER, allowNull: false },
    min_stock: { type: INTEGER, allowNull: false },
    categoryId: { type: INTEGER, allowNull: false },
    serial_number: { type: STRING, allowNull: true },
  },
  { timestamps: true, freezeTableName: true }
);


product.sync()

CategoryModel.hasMany(product,{
  foreignKey:"categoryId"
})

product.belongsTo(CategoryModel)

module.exports = product
