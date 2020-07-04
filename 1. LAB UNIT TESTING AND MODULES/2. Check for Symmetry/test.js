let isSymmetric = require("./checkForSymmetry.js")
let expect = require("chai").expect;
let assert = require("chai").assert;

describe("isSymmetric", function(){
    it("should return true with symetric array of numbers parameter", function(){
        let actual = isSymmetric([1, 2, 3, 2, 1]);
        assert.equal(actual, true, "The function did not return correct result!");
    });
    it("should return true with symetric array of numbers parameter", function(){
        let actual = isSymmetric([1, 2, 2, 1]);
        assert.equal(actual, true, "The function did not return correct result!");
    });
    it("should return true with symetric array of strings parameter", function(){
        let actual = isSymmetric(["aaa", "bbb", "bbb", "aaa"]);
        assert.equal(actual, true, "The function did not return correct result!");
    });
    it("should return true with empty array parameter", function(){
        let actual = isSymmetric([]);
        assert.equal(actual, true, "The function did not return correct result!");
    });
    it("should return true with different elements in array parameter", function(){
        let actual = isSymmetric([10, "hello", { name: "Ivan" }, { name: "Ivan" }, "hello", 10]);
        assert.equal(actual, true, "The function did not return correct result!");
    });
    it("should return true with one element in array parameter", function(){
        let actual = isSymmetric(["aaa"]);
        assert.equal(actual, true, "The function did not return correct result!");
    });
    it("should return false with non-symetric array parameter", function(){
        let actual = isSymmetric([1, 2, 3, 2, 5]);
        assert.equal(actual, false, "The function did not return correct result!");
    });
    it("should return false with string parameter", function(){
        let actual = isSymmetric("aaa");
        assert.equal(actual, false, "The function did not return correct result!");
    });
    it("should return false with boolean parameter", function(){
        let actual = isSymmetric(true);
        assert.equal(actual, false, "The function did not return correct result!");
    });
})