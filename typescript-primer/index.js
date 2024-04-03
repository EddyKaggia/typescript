class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
  toString() {
    return `toString: Name: ${this.name}, Price: ${this.price}`;
  }
}

// TaxedProduct class uses extend keyword to inherit from the Product class
class TaxedProduct extends Product {
  constructor(name, price, taxRate = 1.2) {
    // Super invokes the superclass constructor
    super(name, price);
    this.taxRate = taxRate;
  }

  getPriceIncTax() {
    return Number(this.price) * this.taxRate;
  }

  toString() {
    let chainResult = super.toString();
    return `${chainResult}, Tax: ${this.getPriceIncTax()}`;
  }
}

let hat = new TaxedProduct("Hat", 100);
let boots = new TaxedProduct("Boots", 100, 1.3);
console.log(hat.toString());
console.log(boots.toString());
