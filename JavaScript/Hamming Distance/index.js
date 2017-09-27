var question1 = prompt("DNA1 - Limit 7 Characters");
var question2 = prompt("DNA2 - Limit 7 Characters");
var dna = "";
var match = 0;

//Run function
checkDNA();

//For loop with IF statement to compare each character inside DNA strings
function checkDNA () {

for (i=0; i<7; i++) {
  if (question1[i] === question2[i]) {
  dna += "^";
  match ++;
  } else {
    dna += " ";
  }
};

//Print out both DNA strings and matches
console.log(question1);
console.log(question2);
console.log(dna);
console.log("DNA matches found: " + match);
};
