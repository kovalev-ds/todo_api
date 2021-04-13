const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Todos", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {},
    },
    description: {
      type: DataTypes.STRING,
    },
  });
};
