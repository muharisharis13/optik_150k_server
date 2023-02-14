const { TEXT, INTEGER } = require("sequelize");
const database = require("../../database");

const token = database.define("token", {
  uuid_admin: {
    type: TEXT,
    unique: true,
    allowNull: false
  },
  token: {
    type: TEXT,
    allowNull: true
  },
  refresh_token: {
    type: TEXT,
    allowNull: true
  },
}, {
  timestamps: true,
  freezeTableName: true
})

token.sync()
module.exports = token