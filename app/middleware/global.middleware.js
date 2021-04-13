const logger = require("morgan");
const express = require("express");

module.exports = (app) => {
  app
    .use(logger("dev"))
    .use(express.json())
    .use(express.urlencoded({ extended: true }));
};
