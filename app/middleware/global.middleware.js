const logger = require("morgan");
const express = require("express");
const path = require("path");
const cors = require("cors");

module.exports = app => {
  app
    .use(logger("dev"))
    .use(cors({ origin: process.env.CORS_ORIGIN }))
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(express.static(path.resolve(process.cwd(), "public")));
};
