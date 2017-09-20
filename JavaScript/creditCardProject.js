// Galvanize initial challenge
// Given 4 different card numbers, add up the numbers for each and find the highest.


var array = ['4916-2600-1804-0530', '4779-252888-3972', '4252-278893-7978', '4556-4242-9283-2260'];
var sum = 0;
var totals = []; //Enty array that will hold total sum for each card


function alex(){

for (arrayPosition = 0; arrayPosition < array.length; arrayPosition++){

  for (i=0; i < array[arrayPosition].length; i++){
    if (isNaN(array[arrayPosition][i])) {
      continue;

    } else {
      sum += parseInt(array[arrayPosition][i]);
    }
  } // inside for loop
  totals.push(sum);
  sum = 0;
} // outside for loop arrayPosition

console.log("Array with totals: " + totals);

var topNumber = Math.max.apply(Math, totals);
console.log('------');
var index = totals.lastIndexOf(topNumber);
console.log("Highest count is: " + topNumber + " and the credit card number is: " + array[index]);
}
