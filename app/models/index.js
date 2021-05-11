const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.POSTGRES_DB_URL, {
  dialect: "postgres",
  logging: false,
});

const Todo = require("./todo.model")(sequelize);
const User = require("./user.model")(sequelize);

User.hasMany(Todo, {
  foreignKey: "userID",
});

Todo.belongsTo(User, { foreignKey: "userID" });

module.exports = sequelize;
