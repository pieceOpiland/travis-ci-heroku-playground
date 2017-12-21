var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TodoItemSchema = new Schema({
    item: String,
    isDone: Boolean
}, {
    timestamps: true
});

module.exports = mongoose.model("TodoItem", TodoItemSchema);
