var assert          = require("chai").assert;
var index           = require("../index");
// var sayHello        = require("../index").sayHello;
// var addNumbers      = require("../index").addNumbers;


//RESULTS
sayHelloResult = index.sayHello();
addNumbersResult = index.addNumbers(5,5);

describe("Index", function() {
    describe("sayHello()", function () {
        it("sayHello should return hello", function() {
            // var result = index.sayHello();
            assert.equal(sayHelloResult, "Hello")
        });
    
        it("sayHello type should show string", function() {
            // var result = index.sayHello();
            assert.typeOf(sayHelloResult, "String");
        });
    });
    
    describe("addNumbers()", function() {
        it("addNumbers should be above 5", function() {
            // var result = index.addNumbers(2,6);
            assert.isAbove(addNumbersResult, 5);
        });
    
        it("addNumbers type should be a number", function() {
            // var result = index.addNumbers(5,5);
            assert.typeOf(addNumbersResult, "number");
        });
    });
});