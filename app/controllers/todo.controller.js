const { getIdParam } = require("../utils");

const {
  models: { Todos },
} = require("../models");

exports.findAll = async (req, res) => {
  const data = await Todos.findAll();
  res.status(200).send(data);
};

exports.create = async (req, res) => {
  if (!req.body.title) {
    res.status(422).send({ success: false, message: "" });
    return;
  }

  const todo = {
    ...req.body,
    completed: false,
  };

  const data = await Todos.create(todo);

  res.status(201).send(data);
};

exports.findByID = async (req, res) => {
  const id = getIdParam(req);
  const data = await Todos.findByPk(id);

  if (data) {
    res.send(data);
  } else {
    res.sendStatus(404);
  }
};

exports.updateByID = async (req, res) => {
  const id = getIdParam(req);
  const [num] = await Todos.update(req.body, { where: { id } });

  if (num === 1) {
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
};

exports.deleteByID = async (req, res) => {
  const id = getIdParam(req);
  const num = await Todos.destroy({ where: { id } });

  if (num === 1) {
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
};
