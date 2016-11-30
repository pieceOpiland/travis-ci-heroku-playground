const todolist = require("../src/TodoList");
const expect = require("chai").expect;

describe("TodoList", function(){
  beforeEach(function(){
    todolist.clearList();
  });
  it("adds an item.", function(){
    const item = "Get milk!";
    todolist.addItem(item);
    var list = todolist.getList();
    expect(list.length).to.equal(1);
    expect(list[0].item).to.equal(item);
  });
  it("marks an item as done.", function(){
    const item = "Do laundry";
    todolist.addItem(item);
    const list = todolist.getList();
    expect(list[0].isDone).to.be.false;
    const task = todolist.completeItem(list[0].id);
    expect(todolist.getList()[0].isDone).to.be.true;
  });
});
