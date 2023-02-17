const { STRING,  TEXT, DATEONLY, INTEGER, INET } = require("sequelize");
const database = require("../../database");

const broken_product = database.define(
  "broken_product",
  {
    uuid: {
      type: TEXT,
      unique: true,
      allowNull: false,
    },
    productCode: {
      type: STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        notNull: true,
      },
    },
    qty:{
        type: INTEGER,
        allowNull: false
    },
    notes:{
        type: TEXT,
        allowNull: false
    },
    broken_date:{
        type: DATEONLY,
        allowNull : false
    }
  },
  { timestamps: true, freezeTableName: true }
);


broken_product.sync()

// CategoryModel.hasMany(broken_product,{
//   foreignKey:"categoryId"
// })

// broken_product.belongsTo(CategoryModel)

module.exports = broken_product
