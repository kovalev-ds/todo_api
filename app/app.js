const express = require("express");
const path = require("path");

const app = express();

require("./middleware/global.middleware")(app);

require("./routes/auth.routes")(app);
require("./routes/todo.routes")(app);

app.use((err, req, res, next) => {
  console.log(err);
  res.sendStatus(500);
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(process.cwd(), "public", "index.html"));
});

module.exports = app;
