const logger = require("morgan");
const express = require("express");
const path = require("path");

module.exports = (app) => {
  app
    .use(logger("dev"))
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(express.static(path.resolve(process.cwd(), "../todo-react/dist")));
};
