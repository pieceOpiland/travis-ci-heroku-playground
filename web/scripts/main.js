(function(){
  // Bootstrap the app here.
  require(["jquery", "bootstrap"], function($){
    $(function(){
      var $container = $("#listContainer");
      var $input = $("#newItem");
      var $list = $("<ul>");
      $.ajax({
        url: "/rest/list",
        method: "GET"
      }).then(function(data){
        for(var i = 0; i < data.length; i++){
          $list.append($("<li>").text(data[i].item));
        }
        $container.append($list);
      });
      $("#submitItem").on("click", function(){
        $.ajax({
          url: "/rest/list",
          method: "POST",
          contentType: "application/json",
          data: JSON.stringify({item: $input.val()})
        }).then(function(data){
          $list.append($("<li>").text(data.item));
          $input.val("");
        });
      });
    });
  });
})();
