const {
  findAll,
  create,
  findByID,
  updateByID,
  deleteByID,
} = require("../controllers/todo.controller");

const { asyncHandler } = require("../utils");

module.exports = app => {
  const router = require("express").Router();

  router.route("/").get(asyncHandler(findAll)).post(asyncHandler(create));
  router
    .route("/:id")
    .get(asyncHandler(findByID))
    .put(asyncHandler(updateByID))
    .delete(asyncHandler(deleteByID));

  app.use("/api/tasks", router);
};
