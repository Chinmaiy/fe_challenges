/*
Variable mutation and type coercion
*/

var firstName = 'John';
var age = 28;
console.log(firstName + ' ' + age); //age is converted/coercied from Number to String 

console.log(`${firstName} ${age}`);

var job, isMarried; //undefined data type at this point
job = 'teacher';
isMarried = false;

console.log(firstName + ' is a ' + age + ' year old ' + job + '. Is he married? ' + isMarried);

console.log(`${firstName} is a ${age} year old ${job}. Is he married? ${isMarried ? 'Yes' : 'No'}`);

age = 'twenty eight'; //dynamic typing

