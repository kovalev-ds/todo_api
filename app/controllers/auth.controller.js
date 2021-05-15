const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { asyncHandler } = require("../utils");
const {
  models: { Users },
} = require("../models");

exports.signin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await Users.findOne({ where: { email } });

  if (!user || !bcrypt.compareSync(password, user.password)) {
    res.sendStatus(401);
    return;
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: 86400,
  });

  res.json({
    id: user.id,
    username: user.username,
    email: user.email,
    token,
  });
});

exports.signup = asyncHandler(async (req, res) => {
  const { email, password, username } = req.body;

  const userExist = await Users.findOne({ where: { email } });

  if (userExist) {
    res.json({ success: false, message: `email ${email} already in use.` });
    return;
  }

  const user = await Users.create({
    email,
    password: bcrypt.hashSync(password, 10),
    username,
  });

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: 86400,
  });

  res.json({
    id: user.id,
    username: user.username,
    email: user.email,
    token,
  });
});

exports.me = asyncHandler(async (req, res) => {
  const user = await Users.findByPk(req.user.id);

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: 86400,
  });

  res.json({
    id: user.id,
    username: user.username,
    email: user.email,
    token,
  });
});
