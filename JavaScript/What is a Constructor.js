// I help you learn! Code by Alex Herrera
// In JavaScript a class is called a Constructor

// Function Constructor
// This will be our blueprint for future "persons" instead of writing them individually
var Person = function(name, yearOfBirth, job) {
  this.name = name,
  this.yearOfBirth = yearOfBirth,
  this.job = job
};

//Inheritance
//This is so important for example if you Constructor had 100 functions inside of it, like get retirement
//age or get math calculations,etc, but not every new constructor (Person) need all of them, nor we
//need to copy the whole thing. Then we use prototypes for those functions like so:
Person.prototype.calculateAge = function(){
  console.log(2017 - this.yearOfBirth);
};
//So if any of the new constructors or persons need to calculate the age, they can access this function
//and those who dont need it, dont copy the whole code unecessarily

// "new" Constructor
var alex = new Person('Alex', 1982, 'Roofer');
alex.calculateAge();

// Withouth the constructor, we would have done something like:
var julie = {
  name: "julie",
  yearOfBirth: 1990,
  job: "Supply Chain Analyst"
};

 // Lets create more Constructors or persons
var lupita = new Person("Lupita", 1954, "Travel Advisor");
var vidal = new Person("Vidal", 1945, "Best Dad Ever");


// -------------- Examples

//Function Constructor (Class)

var Family = function(name, age, married) {
  this.name = name,
  this.age = age,
  this.married = married
};

var alex = new Family("Alex", 34, false);
var julie = new Family("Julie", 27, true);

//This will define lastname for all members of the Family to Sanchez
Family.Prototype.lastname = 'Sanchez';
