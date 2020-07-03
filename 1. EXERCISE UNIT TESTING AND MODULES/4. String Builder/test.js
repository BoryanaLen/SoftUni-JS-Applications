const StringBuilder = require("./string-builder.js");

let expect = require("chai").expect;
let assert = require("chai").assert;

describe("string-builder.js", function(){
    describe("Instantiation", function(){
        it("should return correct result with string parameter", function(){
            expect(() => new StringBuilder("hello")).to.not.throw();
        });
        it("should return correct result without parameter", function(){
            expect(() => new StringBuilder()).to.not.throw();
        });
        it("should throw error with non-string parameter", function(){
            expect(() => new StringBuilder(5)).to.throw(TypeError);
        });
        it("It should have initialized all methods", function() {
            const builder = new StringBuilder('test')

            expect(Object.getPrototypeOf(builder).hasOwnProperty('append')).to.be.equal(true);
            expect(Object.getPrototypeOf(builder).hasOwnProperty('prepend')).to.be.equal(true);
            expect(Object.getPrototypeOf(builder).hasOwnProperty('insertAt')).to.be.equal(true);
            expect(Object.getPrototypeOf(builder).hasOwnProperty('remove')).to.be.equal(true);
            expect(Object.getPrototypeOf(builder).hasOwnProperty('toString')).to.be.equal(true)
        });
    });

    describe("Append", function(){
        let instance = null;
        beforeEach(function () {
            instance = new StringBuilder();
        });
        
        it("should return correct result with string parameter", function(){
            expect(() => instance.append(", there").to.not.throw());
        });
        it("should return correct result with string parameter", function(){
            instance.append(", there");
            let actualResult = instance._stringArray;
            let expectResult = Array.from(", there");
            assert.deepEqual(actualResult, expectResult, "The function did not return correct result!");
        });
        it("should return throw error with non-string parameter", function(){
            expect(() => instance.append(5).to.throw(TypeError));
        });
    });

    describe("Prepend", function(){
        let instance = null;
        beforeEach(function () {
            instance = new StringBuilder();
            instance.append(", there");
        });
        
        it("should return correct result with string parameter", function(){
            expect(() => instance.prepend('User, ').to.not.throw());
        });
        it("should return correct result with string parameter", function(){
            instance.prepend('User, ');
            let actualResult = instance._stringArray;
            let expectResult = Array.from("User, " + ", there");
            assert.deepEqual(actualResult, expectResult, "The function did not return correct result!");
        });
        it("should return throw error with non-string parameter", function(){
            expect(() => instance.prepend(1).to.throw(TypeError));
        });
    });

    describe("InsertAt", function(){
        let instance = null;
        beforeEach(function () {
            instance = new StringBuilder("hello");
            instance.append(", there");
            instance.prepend("User, ");
        });
        
        it("should return correct result with string parameter", function(){
            expect(() => instance.insertAt('woop',5 ).to.not.throw());
        });
        it("should return correct result with string parameter", function(){
            instance.insertAt('woop',5 );
            let actualResult = instance._stringArray;
            let expectResult = Array.from("User,woop hello, there");
            assert.deepEqual(actualResult, expectResult, "The function did not return correct result!");
        });
        it("should return throw error with non-string parameter", function(){
            expect(() => instance.insertAt(1, 5).to.throw(TypeError));
        });
    });

    describe("Remove", function(){
        let instance = null;
        beforeEach(function () {
            instance = new StringBuilder("hello");
            instance.append(", there");
            instance.prepend("User, ");
            instance.insertAt('woop',5 );
        });
        
        it("should return correct result", function(){
            expect(() => instance.remove(6, 3).to.not.throw());
        });
        it("should return correct result", function(){
            instance.remove(6, 3);
            let actualResult = instance._stringArray;
            let expectResult = Array.from("User,w hello, there");
            assert.deepEqual(actualResult, expectResult, "The function did not return correct result!");
        });
    }); 
    
    describe("ToString", function(){
        let instance = null;
        beforeEach(function () {
            instance = new StringBuilder("hello");
            instance.append(", there");
            instance.prepend("User, ");
            instance.insertAt('woop',5 );
            instance.remove(6, 3);
        });
        
        it("should return correct result", function(){
            expect(() => instance.toString().to.not.throw());
        });
        it("should return correct result", function(){
            let actualResult = instance.toString();
            let expectResult = "User,w hello, there";
            assert.equal(actualResult, expectResult, "The function did not return correct result!");
        });
    });
})