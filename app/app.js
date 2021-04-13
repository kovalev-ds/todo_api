const express = require("express");

const app = express();

require("./middleware/global.middleware")(app);
require("./routes/todo.routes")(app);

app.get("/", (req, res) => {
  res.send({ message: "ok" });
});

app.use((err, req, res, next) => {
  console.log(err);
  res.sendStatus(500);
});

module.exports = app;
