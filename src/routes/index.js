const Router = require("express").Router;

const TodoRouter = require("./TodoRouter");

var exports = module.exports = new Router();

exports.use(TodoRouter);
