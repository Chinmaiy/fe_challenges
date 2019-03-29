/*
Variable mutation and type coercion
*/

var firstName = 'John';
var age = 28;
//console.log(firstName + ' ' + age); //age is converted/coercied from Number to String 

//console.log(`${firstName} ${age}`);

var job, isMarried; //undefined data type at this point
job = 'teacher';
isMarried = false;

//console.log(firstName + ' is a ' + age + ' year old ' + job + '. Is he married? ' + isMarried);

//console.log(`${firstName} is a ${age} year old ${job}. Is he married? ${isMarried ? 'Yes' : 'No'}`);

age = 'twenty eight'; //dynamic typing

/* Function constructor and prototype property */


var Person = function(name, job) {
    this.name = name;
    this.job = job;
}

Person.prototype.whoIAm = function() {
    console.log(`I am ${this.name} and work as a ${job}.`);
}

Person.prototype.lastName = "Smith";

var john = new Person('John', "developer");
var mary = new Person('Mary', 'designer');

//john.whoIAm();
// mary.whoIAm();

/* Object.create */

var personProto = {
    calculateAge:  function() {
        console.log(2019 - this.yearOfBirth);
    }
}

var john = Object.create(personProto);
john.ageOfBirth = 1990;

var jane = Object.create(personProto, {
    yearOfBirth: {
        value: 1991
    }
})

/* Functions as arguments */

var years = [1990, 1965, 1937, 2005, 1998];

//i.e. map with fn as callback
function arrayCalc(arr, fn) {
    var res = [];
    for(var i = 0; i < arr.length; ++i) {
        res.push(fn(arr[i]));
    }
    return res;
}

function calculateAge(el) {
    return 2019 - el;
}

var ages = arrayCalc(years, calculateAge);
//console.log(ages);

/* Closures */

function retirement(retirementAge) {
    var a = ' years left until retirement.';
    return function(yearOfBirth) {
        var age = 2019 - yearOfBirth;
        console.log((retirementAge - age) + a);
    }
}

var retirementUS = retirement(66);
//retirementUS(1990);

/* Bind, call, apply */
var john  = {
    name: 'John',
    age: 26,
    job: 'teacher',
    presentation: function(style, timeOfDay) {
        if(style === 'formal') {
            console.log(`Good ${timeOfDay}, ladies and gentlemen! I'm ${this.name}, I'm a ${this.job} and I'm ${this.age} years old.`);
        } else if(style === 'friendly') {
            console.log(`Hey! What's up? I'm ${this.name}, I'm a ${this.job} and I'm ${this.age} years old. Have a nice  ${timeOfDay}!`);
        }
    }
}

var emily = {
    name: 'Emily', 
    age: 35,
    job: 'designer'
}

//john.presentation('formal', 'morning');

//john.presentation.call(emily, 'friendly', 'afternoon'); //method borrowing

//john.presentation.apply(emily, ['friendly', 'afternoon']);

var johnFriendly = john.presentation.bind(john, 'friendly');

//johnFriendly('morning');
//johnFriendly('night');

var emilyFormal = john.presentation.bind(emily, 'formal');
//emilyFormal('afternoon');

function isFullAge(limit, el) {
    return el >= limit;
}

var fullJapan = arrayCalc(ages, isFullAge.bind(this, 20)); //the this is not important here
//console.log(fullJapan);