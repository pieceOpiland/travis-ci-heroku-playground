var assert = require('assert');
var exp = require('../src/');

describe("My Module", function(){
  it("should pass", function(){ 
    assert.equal(3, exp());
  });
});
