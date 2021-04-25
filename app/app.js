const express = require("express");
const path = require("path");

const app = express();

require("./middleware/global.middleware")(app);
require("./routes/todo.routes")(app);

app.use((err, req, res, next) => {
  console.log(err);
  res.sendStatus(500);
});

console.log(process.cwd());

app.get("*", (req, res) => {
  res.sendFile(path.resolve(process.cwd(), "../todo-react/dist", "index.html"));
});

module.exports = app;
