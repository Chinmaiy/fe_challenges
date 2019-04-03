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

/* Parks and Streets */
class Identifiable {

    constructor(name, buildYear) {
        this.name = name;
        this.buildYear = buildYear;
    }

    getName() {
        return this.name;
    }
}

class Park extends Identifiable {
    constructor(name, buildYear, treeNr, parkArea) {
        super(name, buildYear);
        this.treeNr = treeNr;
        this.parkArea = parkArea;
    }

    getTreeNr() {
        return this.treeNr;
    }

    getDensity() {
        return this.treeNr / this.parkArea;
    }

    getAge() {
        let currentYear = new Date().getFullYear();
        return currentYear - this.buildYear;
    }
}

class Street extends Identifiable {
    constructor(name, buildYear, length, category = 'normal') {
        super(name, buildYear);
        this.length = length;
        this.category = category;
    }

    getLength() {
        return this.length;
    }

    getBuildYear() {
        return this.buildYear;
    }

    getCategory() {
        return this.category;
    }
}

class City {

    constructor(parks, streets) {
        this.parks = parks;
        this.streets = streets;
    }

    getParksReport() {
        return `-----PARKS REPORT-----
${this.getParksAverageAge()}
${this.getTreeDensity()}
${this.getParkWithMoreThan(1000)}`;
    }

    getStreetsReport() {
        return `-----STREETS REPORT-----
${this.getStreetLengthReport()}
${this.getStreets()}`
    }

    getTreeDensity() {
        return this.parks
            .map((park, idx) => `${idx + 1}. ${park.getName()}: ${park.getDensity()} trees per square km.`)
            .reduce((acc, curr) => `${acc}\n${curr}`);
    }

    getParksAverageAge() {
        let parksNr = this.parks.length;
        let averageAge = this.parks
            .map(park => park.getAge())
            .reduce((acc, curr) => acc + curr) / parksNr;
        return `Our ${parksNr} parks have an average of ${averageAge} years.`;
    }

    getParkWithMoreThan(treeNr) {
        let park = this.parks.find(park => park.getTreeNr() > treeNr);
        return `${park ? park.getName() : 'No park'} has more than ${treeNr}.`
    }

    getStreetLengthReport() {
        let totalLength = this.streets
            .map(street => street.getLength())
            .reduce((acc, curr) => acc + curr);
        let avg = totalLength / this.streets.length;
        return `Our ${this.streets.length} streets have a total of ${totalLength} km, with an average of ${avg} km.`;
    }

    getStreets() {
        return this.streets
            .map(street => `${street.getName()}, built in ${street.getBuildYear()}, is a ${street.getCategory()} street.`)
            .reduce((acc, curr) => `${acc}\n${curr}`);
    }
}

let greenPark = new Park('Green Park', 1912, 3500, 20);
let nationalPark = new Park('National Park', 1930, 5000, 30);
let oceanStreet = new Street('Ocean Avenue', 1999, 100, 'big');

let city = new City([greenPark, nationalPark], [oceanStreet]);

//console.log(city.getParksReport());
//console.log(city.getStreetsReport());

/* Promises */

const getIds = new Promise((resolveCallback, rejectCallback) => {
    
    //simulate work (e.g. api call) that takes some time
    setTimeout(() => {
        resolveCallback([523, 883, 432, 974]);
        //rejectCallback("Getting ids failed.");
    }, 1500);
    //setTimeout cannot fail that's why the reject callback is not used
})

const getRecipe = id => {
    return new Promise((resolve, reject) => {
        setTimeout(id => {
            const recipe = {
                title: 'French tomato pasta',
                published: 'Jonas'
            }
            resolve(`${id}: ${recipe.title}`);
            //reject(`Getting recipe #${id} failed`);
        }, 1500, id);
    })
};

const getRelated = publisher => {
    return new Promise((resolve, reject) => {
        setTimeout(publisher => {
            const relatedRecipe = {
                title: 'Italian pizza',
                publisher: publisher
            };
            resolve(relatedRecipe);
        }, 1500, publisher);
    })
};

getIds
    .then(ids => {
        //console.log(ids);
        return getRecipe(ids[2]);
    })
    //.catch(error => console.log(error))
    .then(recipe => {
        //console.log(recipe);
        return getRelated('Jonas');
    })
    //.then(relatedRecipe => console.log(relatedRecipe))
    .catch(error => console.log(`Error!!! Details: ${error}`));

/* Async / Await for consuming Promises */

async function getRecipesAW() {
    const ids = await getIds;
    //console.log(ids);
    const recipe = await getRecipe(ids[2]);
    //console.log(recipe);
    const related = await getRelated('Jonas');
    //console.log(related);

    return recipe;
}

//getRecipesAW().then(result => console.log(`${result} is the best ever!`));


/* Fetch API - return a Promise => all you need is to consume it i.e. provide the resolve and reject callbacks */

// fetch('http://api.tvmaze.com/search/shows?q=friends')
//     .then(response => response.json())
//     .then(data => console.log(data))
//     .catch(error => console.log(error));

async function getShowsLike(query) {
    const response = await fetch(`http://api.tvmaze.com/search/shows?q=${query}`);
    const data = await response.json();
    console.log(data);
} 

getShowsLike('friends');