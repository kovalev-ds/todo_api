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
    res.json(
      formFailResponse("incorrect email or password. please try again.")
    );
    return;
  }

  res.json(formSuccessResponse(user));
});

exports.signup = asyncHandler(async (req, res) => {
  const { email, password, username } = req.body;

  const userExist = await Users.findOne({ where: { email } });

  if (userExist) {
    res.json(formFailResponse(`email ${email} already in use.`));
    return;
  }

  const user = await Users.create({
    email,
    password: bcrypt.hashSync(password, 10),
    username,
  });

  res.json(formSuccessResponse(user));
});

exports.me = asyncHandler(async (req, res) => {
  const user = await Users.findByPk(req.user.id);

  res.json(formSuccessResponse(user));
});

function formSuccessResponse(user) {
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: 86400,
  });

  return {
    success: true,
    token,
    id: user.id,
    username: user.username,
    email: user.email,
  };
}

function formFailResponse(message) {
  return {
    success: false,
    message,
  };
}
