let rgbToHexColor = require("./rgb-to-hex.js");
let assert = require("chai").assert;
let expect = require("chai").expect;

describe("rgbToHexColor", function(){
    it("should return undefined with non-number parameter", function(){
        let actual = rgbToHexColor(13, 10, "aaa");
        assert.equal(actual, undefined, "The function did not return correct result!");
    });
    it("should return undefined with non-number parameter", function(){
        let actual = rgbToHexColor(13, "aaa", 10);
        assert.equal(actual, undefined, "The function did not return correct result!");
    });
    it("should return undefined with non-number parameter", function(){
        let actual = rgbToHexColor("aaa", 10, 13);
        assert.equal(actual, undefined, "The function did not return correct result!");
    });
    it("should return undefined with out of range parameter", function(){
        let actual = rgbToHexColor(13, 10, 1200);
        assert.equal(actual, undefined, "The function did not return correct result!");
    });
    it("should return undefined with out of range parameter", function(){
        let actual = rgbToHexColor(1300, 10, 120);
        assert.equal(actual, undefined, "The function did not return correct result!");
    });
    it("should return undefined with out of range parameter", function(){
        let actual = rgbToHexColor(13, 1000, 120);
        assert.equal(actual, undefined, "The function did not return correct result!");
    });
    it("should return undefined with negative parameter", function(){
        let actual = rgbToHexColor(-13, 10, 120);
        assert.equal(actual, undefined, "The function did not return correct result!");
    });
    it("should return undefined with negative parameter", function(){
        let actual = rgbToHexColor(13, -2, 120);
        assert.equal(actual, undefined, "The function did not return correct result!");
    });
    it("should return undefined with negative parameter", function(){
        let actual = rgbToHexColor(13, 10, -120);
        assert.equal(actual, undefined, "The function did not return correct result!");
    });
    it("should return undefined with empty parameter", function(){
        let actual = rgbToHexColor();
        assert.equal(actual, undefined, "The function did not return correct result!");
    });
    it("should return undefined with string parameter", function(){
        let actual = rgbToHexColor("hello");
        assert.equal(actual, undefined, "The function did not return correct result!");
    });
    it("should return undefined with object parameter", function(){
        let actual = rgbToHexColor({name: "Ivan"});
        assert.equal(actual, undefined, "The function did not return correct result!");
    });
    it("should return undefined with decimal parameter", function(){
        let actual = rgbToHexColor(3.14, 10, 13);
        assert.equal(actual, undefined, "The function did not return correct result!");
    });
    it("should return undefined with decimal parameter", function(){
        let actual = rgbToHexColor(38, 10, 13.88);
        assert.equal(actual, undefined, "The function did not return correct result!");
    });
    it("should return undefined with decimal parameter", function(){
        let actual = rgbToHexColor(38, 10.7, 13);
        assert.equal(actual, undefined, "The function did not return correct result!");
    });
    it("should return correct result with correct parameters", function(){
        let actual = rgbToHexColor(235, 64, 52);
        assert.equal(actual, "#EB4034", "The function did not return correct result!");
    });
    it("should return correct result with correct parameters", function() {
        let actual = rgbToHexColor(0, 0, 0);
        expect(actual).to.be.equal('#000000');
    });

    it("should return correct result with correct parameters", function() {
        let actual = rgbToHexColor(255, 255, 255);
        expect(actual).to.be.equal("#FFFFFF")
    });
})