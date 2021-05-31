const sequelize = require("../db");
const { DataTypes } = require("sequelize");
const User = sequelize.define(
  "User",
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userAvatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {}
);
module.exports = User;
