const Router = require("express").Router;
var TodoItem = require("../models/TodoItem");

var exports = module.exports = new Router();

exports.route("/list")
.get(function(req, res){
  TodoItem.find().exec(function(err, items) {
      if(err) {
        res.sendStatus(500);
      } else {
        res.json(items);
      }
  });
})
.post(function(req, res){
  if( typeof req.body.item !== "undefined" ){
    new TodoItem({item: req.body.item}).save(function(err, item) {
      if(err) {
        res.sendStatus(500);
      } else {
        res.json(item);
      }
    });
  } else {
    res.sendStatus(500);
  }
})
.put(function(req, res){
  if( typeof req.body.id !== "undefined" ){
    TodoItem.findById(req.body.id).exec(function(err, item) {
      if (err) {
        res.sendStatus(500);
      } else {
        item.isDone = true;
        item.save(function(err) {
            if(err) {
              res.sendStatus(500);
            } else {
              TodoItem.find().exec(function(err, items) {
                if(err) {
                  res.sendStatus(500);
                } else {
                  res.json(items);
                }
              })
            }
        });
      }
    })
  }
});
