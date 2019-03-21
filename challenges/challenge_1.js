var COUNTER = initializeCounter();
setCalcButtonVisibility();

function setCalcButtonVisibility() {
    var calcBtn = document.getElementById("calc-button");
    calcBtn.style.display = COUNTER === 0 ? "none" : "initial";
}

function initializeCounter() {
    var peopleContainer = getPeopleContainer();
    return peopleContainer.children.length;
}

function getCounter() {
    COUNTER++;
    return COUNTER;
}

function addPersonDataContainer() {

    var peopleContainer = getPeopleContainer();
    var personContainer = createPersonDataContainer();
    peopleContainer.appendChild(personContainer);

    if(COUNTER === 1) {
        setCalcButtonVisibility();
    }
}

function getPeopleContainer() {
    return document.getElementsByClassName("people-data-container")[0];
}

function createPersonDataContainer() {
    var counter = getCounter();

    var personContainer = document.createElement("div");
    personContainer.className = "ordered-list-item person-data-container";

    personContainer.appendChild(createUserInput("text", "name", "Name", counter));
    personContainer.appendChild(createUserInput("text", "mass", "Mass (kg)", counter));
    personContainer.appendChild(createUserInput("text", "height", "Height (m)", counter));
    return personContainer;
}

function createUserInput(type, nameMiddle, placeholder, number) {

    var userInput = document.createElement("input");
    userInput.type = type;
    userInput.name = `person-${nameMiddle}-${number}`;
    userInput.className = "user-input";
    userInput.placeholder = placeholder;

    return userInput;
}

function calculateBMITop() {
    setBmiTopContainerVisible();

    var bmiTop = document.getElementsByClassName("bmi-top")[0];
    getBmiData()
        .sort((fst, snd) => fst.bmi - snd.bmi)
        .map(getPersonBmiUI)
        .forEach(personUI => bmiTop.appendChild(personUI));
}

function getPersonBmiUI(personData) {
    var p = document.createElement("p");
    p.className = "ordered-list-item person-top";
    p.innerText = `${personData.name} - ${personData.bmi}`;
    return p;
}

function setBmiTopContainerVisible() {
    var bmiTopContainer = document.getElementsByClassName("bmi-top-container")[0];
    bmiTopContainer.style.display = "flex";
}

function getBmiData() {

    var peopleContainer = getPeopleContainer();
    return [...peopleContainer.children]
        .map(getPersonBmiData)
        .map(([name, mass, height]) => {
            return {
                name: name,
                bmi: computeBmi(mass, height)
            };
        });
}

function getPersonBmiData(personContainer) {
    var data = [...personContainer.children]
        .map(userInput => userInput.value);
    return data;
}

function computeBmi(mass, height) {
    return mass / Math.pow(height, 2);
}