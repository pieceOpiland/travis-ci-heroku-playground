define(function(require){
  var TodoList = require("TodoList");
  
  describe("TodoList", function(){
    var $container = $("<div>");
    var TEST_DATA = [{
      _id: "fea2390a",
      item: "Just a test",
      isDone: false
    }];
    
    var requests;
    var xhr;
    before(function(){
      xhr = sinon.useFakeXMLHttpRequest();

      xhr.onCreate = function(req){
        requests.push(req);
      };
    });
    beforeEach(function(){
      requests = [];
    });
    after(function(){
      xhr.restore();
    });
    
    it("renders the into the container.", function(done){
      TodoList.renderInto($container).then(function(){
        expect($container.find("li").length).to.equal(TEST_DATA.length);
        done();
      });
      expect(requests.length).to.equal(1);
      requests[0].respond(200, {"Content-Type": "application/json"}, JSON.stringify(TEST_DATA));
      
    });
  });
});
