const jwt = require("jsonwebtoken");

const {
  models: { Users },
} = require("../models");

module.exports = async (req, res, next) => {
  const token = req.get("x-access-token");
  if (!token) {
    res.sendStatus(403);
    return;
  }

  try {
    const { id } = jwt.verify(token.trim(), process.env.JWT_SECRET);
    console.log("protect id: ", id);
    req.user = { id };
    // req.user = await Users.findByPk(id);
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(401);
    return;
  }
};
