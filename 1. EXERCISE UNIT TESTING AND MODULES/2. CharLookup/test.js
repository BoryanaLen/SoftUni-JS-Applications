const lookupChar = require("./charLookUp.js");

let expect = require("chai").expect;
let assert = require("chai").assert;

describe("lookipChar", function(){
    it("should return undefined with a non-string first parameter", function(){
        let actual = lookupChar(13, 0);
        assert.equal(actual, undefined, "The function did not return correct result!");
    });
    it("should return undefined with a non-number second parameter", function(){
        expect(lookupChar("aaaa", "bbbb")).to.equal(undefined, "The function did not return correct result!");
    });
    
    it("should return undefined with a floating-point number second parameter", function(){
        expect(lookupChar("aaaa", 1.2)).to.equal(undefined, "The function did not return correct result!");
    });

    it("should return incorrect index with an incorrect index value", function(){
        expect(lookupChar("aaaa", 10)).to.equal("Incorrect index", "The function did not return correct result!");
    });
    it("should return incorrect index with negative index value", function(){
        expect(lookupChar("aaaa", -1)).to.equal("Incorrect index", "The function did not return correct result!");
    });
    it("should return incorrect index with an index value equal to string length", function(){
        expect(lookupChar("aaaa", 4)).to.equal("Incorrect index", "The function did not return correct result!");
    });
    it("should return correct value with correct parameters", function(){
        expect(lookupChar("abcd", 1)).to.equal("b", "The function did not return correct result!");
    });
    it("should return correct value with correct parameters", function(){
        expect(lookupChar("Ivan", 0)).to.equal("I", "The function did not return correct result!");
    });
})