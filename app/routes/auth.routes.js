const express = require("express");

const { signin, signup, me } = require("../controllers/auth.controller");
const protect = require("../middleware/protect.middleware");

module.exports = app => {
  const router = express.Router();

  // add req.body validation mw

  router.post("/signin", signin);
  router.post("/signup", signup);
  router.get("/me", protect, me);

  app.use("/api/auth", router);
};
