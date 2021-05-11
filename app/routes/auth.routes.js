const express = require("express");

const { signin, signup } = require("../controllers/auth.controller");

module.exports = app => {
  const router = express.Router();

  // add req.body validation mw

  router.post("/signin", signin);
  router.post("/signup", signup);

  app.use("/api/auth", router);
};
