mocha.setup('bdd');
var expect = chai.expect;
var should = chai.should();

(function(){

  var isKarma = typeof window.__karma__ !== "undefined";
  var baseUrl;
  
  if( isKarma ){
    baseUrl = "/base/scripts"
  } else {
    baseUrl = "../scripts"
  }
  require.config({
    baseUrl: baseUrl,
    paths: {
      "jquery": "../libs/jquery/dist/jquery.min",
      "bootstrap": "../libs/bootstrap/dist/js/bootstrap.min",
      "specs": "../test/scripts/specs"
    },
    shim: {
      "bootstrap": {
        deps: ["jquery"]
      }
    }
  });
  
  require(["specs/TestSpec", "specs/TodoListSpec"], function(){
    if( isKarma ) {
      window.__karma__.start();
    } else {
      mocha.run();
    }
  });
})();
