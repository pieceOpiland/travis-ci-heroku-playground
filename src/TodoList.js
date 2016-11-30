const crypto = require("crypto");

const list = [];

const getUUID = function(){
  return crypto.randomBytes(16).toString("hex");
};

const addItem = function(item){
  const task = {
    isDone: false,
    id: getUUID(),
    item: item
  };
  list.push(task);
  return task;
};

const getById = function(id){
  for(var i = 0; i < list.length; i++){
    var item = list[i];
    if(item.id === id) {
      return item;
    }
  }
  return null;
};

const completeItem = function(id){
  var item = getById(id);
  if(item !== null){
    item.isDone = true;
  }
};

var exports = module.exports = {
  addItem: addItem,
  getById: getById,
  completeItem: completeItem,
  getList: function(){
   return Object.assign([], list); 
  },
  clearList: function(){
    list.splice(0);
  }
};
