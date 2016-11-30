const Router = require("express").Router;
const todolist = require("../TodoList");

var exports = module.exports = new Router();

exports.route("/list")
.get(function(req, res){
  res.json(todolist.getList());
})
.post(function(req, res){
  if( typeof req.body.item !== "undefined" ){
    res.json(todolist.addItem(req.body.item));
  } else {
    res.sendStatus(500);
  }
})
.put(function(req, res){
  if( typeof req.body.id !== "undefined" ){
    todolist.completeItem(req.body.id);
  }
  res.json(todolist.getList());
});
