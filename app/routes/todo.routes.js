const protect = require("../middleware/protect.middleware");
const {
  findAll,
  create,
  findByID,
  updateByID,
  deleteByID,
} = require("../controllers/todo.controller");

module.exports = app => {
  const router = require("express").Router();

  router.route("/").get(findAll).post(create);
  router.route("/:id").get(findByID).put(updateByID).delete(deleteByID);

  app.use("/api/tasks", protect, router);
};
