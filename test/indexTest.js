var assert = require("chai").assert;
// var index  = require("../index");
var sayHello = require("../index").sayHello;

describe("Index", function() {
    it("sayHello should return hello", function() {
        var result = sayHello();
        assert.equal(result, "Hello")
    });

    it("sayHello type should show string", function() {
        var result = sayHello();
        assert.typeOf(result, "String");
    })
});