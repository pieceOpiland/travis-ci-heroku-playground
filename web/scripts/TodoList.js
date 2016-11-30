define(function(require){
  var $ = require("jquery");
  var $list = $("<ul>");
  var renderItem = function(task){
    var $checkbox = $("<input type=\"checkbox\" />");
    $checkbox.data("id", task.id);
    $checkbox.prop("checked", task.isDone);
    $checkbox.prop("disabled", task.isDone);
    
    $checkbox.on("change", updateItem);
    
    var $text = $("<span>").text(task.item);
    $list.append($("<li>").append($checkbox).append($text));
  };
  var renderItems = function(items){
    for(var i = 0; i < items.length; i++){
      renderItem(items[i]);
    }
  };
  
  var updateItem = function(e){
    var $this = $(this);
    $.ajax({
      url: "/rest/list",
      method: "PUT",
      contentType:"application/json",
      data: JSON.stringify({id: $this.data("id")})
    }).then(function(){
      $this.prop("disabled", $this.prop("checked"));
    });
  };

  var populateList = function(){
    return $.ajax({
      url: "/rest/list",
      method: "GET"
    }).then(function(data){
      $list.html("");
      renderItems(data);
    });
  };
  
  var addItem = function(text) {
    return $.ajax({
      url: "/rest/list",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify({item: text})
    }).then(function(data){
      renderItem(data);
    });
  };

  var renderInto = function($el){
    $el.append($list);
    return populateList();
  };

  return {
    renderInto: renderInto,
    addItem: addItem
  }
});
