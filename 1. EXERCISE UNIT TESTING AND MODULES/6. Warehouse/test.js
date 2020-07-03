const Warehouse = require("./Warehouse.js");

let expect = require("chai").expect;
let assert = require("chai").assert;


describe("Warehouse", function(){

    let instance;
    beforeEach(function () {
       instance = new Warehouse(10)
    });

    describe("Instantiation", function(){
        let instance;
        beforeEach(function () {
            instance = new Warehouse(10)
        });

        it("should return correct result with non-negative capacity parameter", function(){
            expect(() => instance = new Warehouse(10)).to.not.throw();
        }); 
        it("should return correct result with non-negative capacity parameter", function(){
            let products = {'Food': {}, 'Drink': {}};

            assert.equal(instance.capacity, 10, "The function did not return correct result!");
            assert.deepEqual(instance.availableProducts, products, "The function did not return correct result!"); 
        });         
        it("should return correct result with non-negative capacity parameter", function(){
            assert.equal(instance.capacity, 10, "The function did not return correct result!"); 
        });      
        it("should return correct result with non-negative capacity parameter", function(){
            instance.capacity = 20;
            assert.equal(instance.capacity, 20, "The function did not return correct result!"); 
        });     
        it("should throw error with negative capacity parameter", function(){
            expect(() => instance = new Warehouse(-10)).to.throw("Invalid given warehouse space");
        });
        it("should throw error with negative capacity parameter", function(){
            expect(() => instance = new Warehouse("aaa")).to.throw("Invalid given warehouse space");
        });
        
        it("It should have initialized all methods", function() {
            expect(Object.getPrototypeOf(instance).hasOwnProperty("addProduct")).to.be.equal(true);
            expect(Object.getPrototypeOf(instance).hasOwnProperty("orderProducts")).to.be.equal(true);
            expect(Object.getPrototypeOf(instance).hasOwnProperty("occupiedCapacity")).to.be.equal(true);
            expect(Object.getPrototypeOf(instance).hasOwnProperty("revision")).to.be.equal(true);
            expect(Object.getPrototypeOf(instance).hasOwnProperty("scrapeAProduct")).to.be.equal(true);
        });
    });

    describe("AddProduct", function(){
        it("should return correct result with correct parameter", function(){
            let instance =  new Warehouse(10);
            let result = instance.addProduct("Food", "Orange", 5);
            let expectResult = instance.availableProducts.Food;
            assert.deepEqual(result, expectResult, "The function did not return correct result!"); 
        }); 
        it("should throw error with full capacity", function(){
            let instance =  new Warehouse(10);
            expect(() => instance.addProduct("Food", "Orange", 25)).to.throw("There is not enough space or the warehouse is already full");
        });
    });

    describe("OrderProducts", function(){
        it("should return correct result with correct parameter", function(){
            let instance =  new Warehouse(10);
            instance.addProduct("Food", "Orange", 2);
            instance.addProduct("Food", "Lemon", 3);
            let result = instance.orderProducts("Food");
            let expectResult = {Lemon: 3, Orange: 2};
            assert.deepEqual(result, expectResult, "The function did not return correct result!"); 
        }); 
    });

    describe("OccupiedCapacity", function(){
        it("should return correct result", function(){
            let instance =  new Warehouse(10);
            instance.addProduct("Food", "Orange", 2);
            instance.addProduct("Food", "Lemon", 3);
            let result = instance.occupiedCapacity();
            assert.deepEqual(result, 5, "The function did not return correct result!"); 
        }); 
    });

    describe("Revision", function(){
        it("should return correct result when warehouse is empty", function () {
            let instance =  new Warehouse(10);
            assert.equal(instance.revision(), 'The warehouse is empty');
        });
 
        it("should return correct result when warehouse is not empty", function(){
            let instance =  new Warehouse(100);
            instance.addProduct("Food", "Orange", 20);
            instance.addProduct("Food", "Lemon", 30);
            let result = [
                "Product type - [Food]",
                "- Orange 20",
                "- Lemon 30",
                "Product type - [Drink]"
            ];
        
            assert.equal(instance.revision(), result.join("\n"), "The function did not return correct result!"); 
        }); 
        it("should return correct result when warehouse is not empty", function(){
            let instance =  new Warehouse(100);
            instance.addProduct("Drink", "Water", 20);
            let result = [
                "Product type - [Food]",
                "Product type - [Drink]",
                "- Water 20"
            ];
        
            assert.equal(instance.revision(), result.join("\n"), "The function did not return correct result!"); 
        }); 
 
        it('should return result if we have food and drinks drinks', function () {
            let instance =  new Warehouse(100);
            instance.addProduct("Food", "Orange", 20);
            instance.addProduct("Food", "Lemon", 30);
            instance.addProduct("Drink", "Water", 20);
            instance.addProduct('Drink', 'Fanta', 30);
 
            let result = [
                "Product type - [Food]",
                "- Orange 20",
                "- Lemon 30",
                "Product type - [Drink]",
                "- Water 20",
                "- Fanta 30"
            ];
        
            assert.equal(instance.revision(), result.join("\n"), "The function did not return correct result!"); 
 
        });
    });

    describe("ScrapeAProduct", function(){
        it("should return correct result when product is not found", function(){
            let instance =  new Warehouse(10);
        
            expect(() => instance.scrapeAProduct("Orange", 10)).to.throw("Orange do not exists");
        });
        it("should return correct result when product is found", function(){
            let instance =  new Warehouse(10);
            instance.addProduct("Food", "Orange", 5);

            let expectResult = {Orange: 3};
        
            assert.deepEqual(instance.scrapeAProduct("Orange", 2), expectResult, "The function did not return correct result!"); 
        }); 
        it("should return correct result when product is found", function(){
            let instance =  new Warehouse(10);
            instance.addProduct("Food", "Orange", 5);

            let expectResult = {Orange: 0};
        
            assert.deepEqual(instance.scrapeAProduct("Orange", 7), expectResult, "The function did not return correct result!"); 
        }); 
    });
})

describe("Warehouse", function(){

    describe("Instantiation", function(){
        let instance;
        beforeEach(function () {
            instance = new Warehouse(10)
        });

        it("should return correct result with non-negative capacity parameter", function(){
            expect(() => instance = new Warehouse(10)).to.not.throw();
        }); 
        it("should return correct result with non-negative capacity parameter", function(){
            let products = {'Food': {}, 'Drink': {}};

            assert.equal(instance.capacity, 10, "The function did not return correct result!");
            assert.deepEqual(instance.availableProducts, products, "The function did not return correct result!"); 
        });         
        it("should return correct result with non-negative capacity parameter", function(){
            assert.equal(instance.capacity, 10, "The function did not return correct result!"); 
        });      
        it("should return correct result with non-negative capacity parameter", function(){
            instance.capacity = 20;
            assert.equal(instance.capacity, 20, "The function did not return correct result!"); 
        });     
        it("should throw error with negative capacity parameter", function(){
            expect(() => instance = new Warehouse(-10)).to.throw("Invalid given warehouse space");
        });
        it("should throw error with negative capacity parameter", function(){
            expect(() => instance = new Warehouse("aaa")).to.throw("Invalid given warehouse space");
        });
        
        it("It should have initialized all methods", function() {
            expect(Object.getPrototypeOf(instance).hasOwnProperty("addProduct")).to.be.equal(true);
            expect(Object.getPrototypeOf(instance).hasOwnProperty("orderProducts")).to.be.equal(true);
            expect(Object.getPrototypeOf(instance).hasOwnProperty("occupiedCapacity")).to.be.equal(true);
            expect(Object.getPrototypeOf(instance).hasOwnProperty("revision")).to.be.equal(true);
            expect(Object.getPrototypeOf(instance).hasOwnProperty("scrapeAProduct")).to.be.equal(true);
        });
    });

    describe("AddProduct", function(){
        it("should return correct result with correct parameter", function(){
            let instance =  new Warehouse(10);
            let result = instance.addProduct("Food", "Orange", 5);
            let expectResult = instance.availableProducts.Food;
            assert.deepEqual(result, expectResult, "The function did not return correct result!"); 
        }); 
        it("should throw error with full capacity", function(){
            let instance =  new Warehouse(10);
            expect(() => instance.addProduct("Food", "Orange", 25)).to.throw("There is not enough space or the warehouse is already full");
        });
    });

    describe("OrderProducts", function(){
        it("should return correct result with correct parameter", function(){
            let instance =  new Warehouse(10);
            instance.addProduct("Food", "Orange", 2);
            instance.addProduct("Food", "Lemon", 3);
            let result = instance.orderProducts("Food");
            let expectResult = {Lemon: 3, Orange: 2};
            assert.deepEqual(result, expectResult, "The function did not return correct result!"); 
        }); 
    });

    describe("OccupiedCapacity", function(){
        it("should return correct result", function(){
            let instance =  new Warehouse(10);
            instance.addProduct("Food", "Orange", 2);
            instance.addProduct("Food", "Lemon", 3);
            let result = instance.occupiedCapacity();
            assert.deepEqual(result, 5, "The function did not return correct result!"); 
        }); 
    });

    describe("Revision", function(){
        it("should return correct result when warehouse is empty", function () {
            let instance =  new Warehouse(10);
            assert.equal(instance.revision(), 'The warehouse is empty');
        });
 
        it("should return correct result when warehouse is not empty", function(){
            let instance =  new Warehouse(100);
            instance.addProduct("Food", "Orange", 20);
            instance.addProduct("Food", "Lemon", 30);
            let result = [
                "Product type - [Food]",
                "- Orange 20",
                "- Lemon 30",
                "Product type - [Drink]"
            ];
        
            assert.equal(instance.revision(), result.join("\n"), "The function did not return correct result!"); 
        }); 
        it("should return correct result when warehouse is not empty", function(){
            let instance =  new Warehouse(100);
            instance.addProduct("Drink", "Water", 20);
            let result = [
                "Product type - [Food]",
                "Product type - [Drink]",
                "- Water 20"
            ];
        
            assert.equal(instance.revision(), result.join("\n"), "The function did not return correct result!"); 
        }); 
 
        it('should return result if we have food and drinks drinks', function () {
            let instance =  new Warehouse(100);
            instance.addProduct("Food", "Orange", 20);
            instance.addProduct("Food", "Lemon", 30);
            instance.addProduct("Drink", "Water", 20);
            instance.addProduct('Drink', 'Fanta', 30);
 
            let result = [
                "Product type - [Food]",
                "- Orange 20",
                "- Lemon 30",
                "Product type - [Drink]",
                "- Water 20",
                "- Fanta 30"
            ];
        
            assert.equal(instance.revision(), result.join("\n"), "The function did not return correct result!"); 
 
        });
    });

    describe("ScrapeAProduct", function(){
        it("should return correct result when product is not found", function(){
            let instance =  new Warehouse(10);
        
            expect(() => instance.scrapeAProduct("Orange", 10)).to.throw("Orange do not exists");
        });
        it("should return correct result when product is found", function(){
            let instance =  new Warehouse(10);
            instance.addProduct("Food", "Orange", 5);

            let expectResult = {Orange: 3};
        
            assert.deepEqual(instance.scrapeAProduct("Orange", 2), expectResult, "The function did not return correct result!"); 
        }); 
        it("should return correct result when product is found", function(){
            let instance =  new Warehouse(10);
            instance.addProduct("Food", "Orange", 5);

            let expectResult = {Orange: 0};
        
            assert.deepEqual(instance.scrapeAProduct("Orange", 7), expectResult, "The function did not return correct result!"); 
        }); 
    });
})