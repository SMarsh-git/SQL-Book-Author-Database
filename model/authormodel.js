const sequelize = require("../db/connection");
const { DataTypes } = require("sequelize");

const Author = sequelize.define("Author", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bookId: {
    type: DataTypes.INTEGER,
    references: { model: "Books", key: "bookId" },
    allowNull: false,
  },
});

module.exports = Author;
