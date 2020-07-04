const sum = require("./index.js");

let assert = require("chai").assert;
let expect = require("chai").expect;

describe("sum", function(){
    it("should return correct result with an array of numbers parameter", function(){
        let actual = sum([1, 2, 3]);
        assert.equal(actual, 6, "The function did not return correct result!");
    });
    it("should return zero with empty array parameter", function(){
        let actual = sum([]);
        assert.equal(actual, 0, "The function did not return correct result!");
    });
    it("should return number with a non-number array parameter", function(){
        let actual = sum(["aaa", "bbb"]);
        expect(typeof actual).to.equal("number", "The function did not return correct result!");
    });
})