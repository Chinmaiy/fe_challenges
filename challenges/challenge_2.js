var TEAMS_COUNTER = initializeTeamsCounter();
setCalcAverageBtnVisibility();

var TEAMS_SCORES_MAP = {};

function initializeTeamsCounter() {
    var teamsDiv = getTeamsContainer();
    return teamsDiv.children.length;
}

function setCalcAverageBtnVisibility() {
    var calcBtn = document.getElementById("calc-averages-btn");
    calcBtn.style.display = TEAMS_COUNTER === 0 ? "none" : "initial";
}

function addTeamContainer() {
    ++TEAMS_COUNTER;
    TEAMS_SCORES_MAP[TEAMS_COUNTER] = 0;
    var teamsDiv = getTeamsContainer();

    var teamDiv = document.createElement("div");
    teamDiv.className = "ordered-list-item team-container";
    teamDiv.appendChild(createTeamName());
    teamDiv.appendChild(createScoresContainer());
    teamDiv.appendChild(createAddScoreBtn(TEAMS_COUNTER));

    teamsDiv.appendChild(teamDiv);
    if(TEAMS_COUNTER === 1) {
        setCalcAverageBtnVisibility();
    }
}

function createTeamName() {
    var teamNameH1 = document.createElement("h1");
    teamNameH1.className = "team-name";
    teamNameH1.innerText = `Team ${TEAMS_COUNTER}`;
    return teamNameH1;
}

function createScoresContainer() {
    var scoresDiv = document.createElement("div");
    scoresDiv.className = "scores-container";
    return scoresDiv;
}

function createAddScoreBtn(teamNr) {
    var addScoreBtn = document.createElement("button");
    addScoreBtn.className = "add-score-btn";
    addScoreBtn.innerText = 'Add Score';
    addScoreBtn.addEventListener('click', () => addScoreToTeam(teamNr));
    return addScoreBtn;
}

function addScoreToTeam(teamNr) {
    var scoresDiv = document.getElementsByClassName("scores-container")[teamNr - 1];
    TEAMS_SCORES_MAP[teamNr] = scoresDiv.children.length + 1;

    var scoreDiv = document.createElement('div');
    scoreDiv.className = "score";
    var scoreInput = document.createElement('input');
    scoreInput.type = 'number';
    scoreInput.className = 'input-score';
    scoreInput.placeholder = `Score ${TEAMS_SCORES_MAP[teamNr]}`;
    scoreDiv.appendChild(scoreInput);

    scoresDiv.appendChild(scoreDiv);
}

function getTeamsContainer() {
    return document.getElementsByClassName("teams-container")[0];
}

function calculateAverages() {
    document.getElementsByClassName('averages-container')[0].style.display = 'initial';
    var averagesList = document.getElementById('averages-list');
    clearChildren(averagesList);

    Object.keys(TEAMS_SCORES_MAP)
        .map(calculateTeamAverage)
        .sort((fst, snd) => snd.avg - fst.avg)
        .map(createAverageListItem)
        .forEach(e => averagesList.appendChild(e));
}

function calculateTeamAverage(teamNr) {
    var scoresDiv = document.getElementsByClassName("scores-container")[teamNr - 1];
    var scoresNr = scoresDiv.children.length;
    var avg;
    if(scoresNr === 0) {
        avg = 0;
    } else {
        var total = [...scoresDiv.children]
        .map(scoreDiv => {
            var score = scoreDiv.children[0].value;
            return score ? parseInt(score, 10) : 0;
        }).reduce((acc, score) => acc + score);
        var avg = total / scoresNr;
    }
    
    return {
        teamNr,
        avg
    };
}

function clearChildren(htmlElement) {
    while(htmlElement.lastChild) {
        htmlElement.removeChild(htmlElement.lastChild);
    }
}

function createAverageListItem(teamInfo) {
    var li = document.createElement('li');
    li.innerHTML = `<b>Team ${teamInfo.teamNr}</b> - ${teamInfo.avg}`;
    return li;
}