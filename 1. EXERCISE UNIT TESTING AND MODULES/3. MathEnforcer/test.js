const mathEnforcer = require("./mathEnforcer.js");

let expect = require("chai").expect;
let assert = require("chai").assert;

describe("mathEnforcer", function(){
    describe("addFive", function(){
        it("should return correct result with a non-number parameter", function(){
            let actual = mathEnforcer.addFive("hello");
            assert.equal(actual, undefined, "The function did not return correct result!");
        });
        it("should return correct result with a negative number parameter", function(){
            let actual = mathEnforcer.addFive(-1);
            assert.equal(actual, 4, "The function did not return correct result!");
        });
        it("should return correct result with a positive number parameter", function(){
            let actual = mathEnforcer.addFive(1);
            assert.equal(actual, 6, "The function did not return correct result!");
        });
        it("should return correct result with floating-point number parameter", function(){
            expect(mathEnforcer.addFive(1.5)).to.be.closeTo(6.5, 0.1);
        });
    })

    describe("subtractTen", function(){
        it("should return correct result with a non-number parameter", function(){
            let actual = mathEnforcer.subtractTen("hello");
            assert.equal(actual, undefined, "The function did not return correct result!");
        });
        it("should return correct result with a negative number parameter", function(){
            let actual = mathEnforcer.subtractTen(-1);
            assert.equal(actual, -11, "The function did not return correct result!");
        });
        it("should return correct result with a positive number parameter", function(){
            let actual = mathEnforcer.subtractTen(1);
            assert.equal(actual, -9, "The function did not return correct result!");
        });
        it("should return correct result with floating-point number parameter", function(){
            expect(mathEnforcer.subtractTen(1.5)).to.be.closeTo(-8.5, 0.1);
        });
    })

    describe("sum", function(){
        it("should return correct result with a non-number parameter", function(){
            let actual = mathEnforcer.sum("hello", 2);
            assert.equal(actual, undefined, "The function did not return correct result!");
        });
        it("should return correct result with a non-number parameter", function(){
            let actual = mathEnforcer.sum(2, "hello");
            assert.equal(actual, undefined, "The function did not return correct result!");
        });
        it("should return correct result with a non-number parameter", function(){
            let actual = mathEnforcer.sum("hi", "hello");
            assert.equal(actual, undefined, "The function did not return correct result!");
        });

        it("should return correct result with negative and positive numbers as parameters", function(){
            let actual = mathEnforcer.sum(-1, 2);
            assert.equal(actual, 1, "The function did not return correct result!");
        });
        it("should return correct result with two positive numbers as parameters", function(){
            let actual = mathEnforcer.sum(1, 2);
            assert.equal(actual, 3, "The function did not return correct result!");
        });
        it("should return correct result with two negative numbers as parameters", function(){
            let actual = mathEnforcer.sum(-1, -2);
            assert.equal(actual, -3, "The function did not return correct result!");
        });
        it("should return correct result with floating-point numbers parameter", function(){
            expect(mathEnforcer.sum(1.5, 1.4)).to.be.closeTo(2.9, 0.1);
        });  
        it("should return correct result with floating-point number and positive number as parameters", function(){
            expect(mathEnforcer.sum(1.5, 1)).to.be.closeTo(2.5, 0.1);
        }); 
        it("should return correct result with floating-point number and negative number as parameters", function(){
            expect(mathEnforcer.sum(1.5, -1)).to.be.closeTo(0.5, 0.1);
        });     
    })
})