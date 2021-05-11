const { getIdParam } = require("../utils");
const { asyncHandler } = require("../utils");

const {
  models: { Todos },
} = require("../models");

exports.findAll = asyncHandler(async (req, res) => {
  const data = await Todos.findAll({ where: { userID: req.user.id } });
  res.status(200).send(data);
});

exports.create = asyncHandler(async (req, res) => {
  if (!req.body.title) {
    res.status(422).send({ success: false, message: "" });
    return;
  }

  const todo = {
    ...req.body,
    userID: req.user.id,
    completed: false,
  };

  const data = await Todos.create(todo);

  res.status(201).send(data);
});

exports.findByID = asyncHandler(async (req, res) => {
  const id = getIdParam(req);
  const data = await Todos.findOne({ where: { id, userID: req.user.id } });

  if (data) {
    res.send(data);
  } else {
    res.sendStatus(404);
  }
});

exports.updateByID = asyncHandler(async (req, res) => {
  const id = getIdParam(req);
  const [num] = await Todos.update(req.body, {
    where: { id, userID: req.user.id },
  });
  if (num === 1) {
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});

exports.deleteByID = asyncHandler(async (req, res) => {
  const id = getIdParam(req);
  const num = await Todos.destroy({ where: { id, userID: req.user.id } });

  if (num === 1) {
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});
