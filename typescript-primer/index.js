let hatPrice = 100;
console.log(`Hat PRICE: ${hatPrice}`);
let bootsPrice = "100";
console.log(`Boots price: ${bootsPrice}`);

if (hatPrice === bootsPrice) {
  console.log("Prices are the same");
} else {
  console.log("Prices are different");
}

let totalPrice = Number(hatPrice) + Number(bootsPrice);
console.log(`Total price: ${totalPrice}`);

let myVariable = "Adam";
console.log(`Type: ${typeof myVariable}`);
myVariable = 100;
console.log(`Type: ${typeof myVariable}`);

let firstCity;
let secondCity = firstCity || "London";
console.log(`City: ${secondCity}`);
