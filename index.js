require("dotenv").config();

const http = require("http");

const sequelize = require("./app/models");
const app = require("./app/app.js");

const PORT = process.env.PORT || 8000;

(async () => {
  await sequelize
    .sync({ alter: true })
    .then(() => {
      http
        .createServer(app)
        .listen(PORT, () =>
          console.log("> server up and running on port: ", PORT)
        );
    })
    .catch(err => {
      console.log(err);
    });
})();
