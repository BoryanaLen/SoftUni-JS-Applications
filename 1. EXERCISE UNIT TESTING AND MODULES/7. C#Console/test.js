const Console = require("./specialConsole.js");

let expect = require("chai").expect;
let assert = require("chai").assert;

describe("Console", function(){
    it("should return passed string", function(){
        let result = Console.writeLine("hello");
        assert.equal(result, "hello", "The function did not return correct result!");
    });
    it("should return passed empty string", function(){
        let result = Console.writeLine("");
        assert.equal(result, "", "The function did not return correct result!");
    });
    it("should return as string passed object", function(){
        let obj = {name: "Ivan", age: 20};
        let actualResult = Console.writeLine(obj);
        assert.equal(actualResult, JSON.stringify(obj), "The function did not return correct result!");
    });


    it("should throw error when multiple arguments are passed, but the first is not a string", function(){
        let obj = {name: "Ivan", age: 20};
        assert.throws(() => { Console.writeLine(obj, 1, 2) }, TypeError, 'No string format given!');
    });
    it("should throw error when the number of parameters does not correspond to the number of placeholders", function(){
        assert.throws(() => {Console.writeLine("The sum of {0} and {1} is {2}", 3, 4, 7, 8) }, RangeError, "Incorrect amount of parameters given!");
    });
    it("should throw error when the placeholders have indexes not withing the parameters range", function(){
        assert.throws(() => { Console.writeLine("The sum of {0} and {1} is {2}", 3) }, RangeError, "Incorrect amount of parameters given!");
    });
    it("should throw error when incorrect placeholders given", function(){
        assert.throws(() => { Console.writeLine("The sum of {13}", 1) }, RangeError, "Incorrect placeholders given!");
    });
    
    it("should return correct result", function(){
        let actualResult = Console.writeLine("The sum of {0} and {1} is {2}", 3, 4, 7);
        let expectedResult = "The sum of 3 and 4 is 7";
        assert.equal(actualResult, expectedResult, "The function did not return correct result!");
    });
})