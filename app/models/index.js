const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DB_CONNECTION_URL, {
  dialect: "postgres",
  logging: false,
});

const modelDefiners = [require("./todo.model")];

for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize);
}

module.exports = sequelize;
