/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var GAME;
newGame(2);
addHandlers();

function addHandlers() {
    firstElemWithClass('btn-new').addEventListener('click', () => newGame(2));
    firstElemWithClass('btn-roll').addEventListener('click', rollDice);
    firstElemWithClass('btn-hold').addEventListener('click', () => {
        if(!GAME.isFinished()) {
            GAME.updateOnHold()
        }
    });
}

function newGame(playersNr) {
    var endScoreInput = document.getElementById('end-score');
    var endScore = endScoreInput.value ? endScoreInput.value : 10;
    endScoreInput.value = endScore;
    endScoreInput.classList.add('score-set');

    [...document.getElementsByClassName('player-name')]
        .forEach((elem, idx) => elem.innerText = `Player ${idx + 1}`);

    var winner = firstElemWithClass('winner');
    if(winner) {
        winner.classList.remove('winner');
    }
    toggleDisplay(['btn-roll', 'btn-hold'], false);
    toggleDisplay(['dice'], true);

    GAME = initGame(playersNr, endScore);
    display(GAME);
}

function firstElemWithClass(className) {
    return document.getElementsByClassName(className)[0];
}

function initGame(playersNr, endScore) {
    return {
        playersNr: playersNr,
        currentPlayer: random(0, playersNr),
        scores: new Array(playersNr).fill(0),
        roundScore: 0,
        endScore: endScore,
        previousDice: -1,

        isFinished: function() {
            return this.scores[this.currentPlayer] >= endScore;
        },

        shouldLoseScore: function(diceRoll) {
            return diceRoll === 6 && diceRoll === this.previousDice;
        },

        updateOnRoll: function(diceRoll) {
            if(diceRoll !== 1) {
                if(this.shouldLoseScore(diceRoll)) {
                    this.scores[this.currentPlayer] = 0;
                    this.nextPlayer();
                }
                else {
                    this.roundScore += diceRoll;
                    this.previousDice = diceRoll;
                }
            }
            else {
                this.nextPlayer();
            }
            display(this);
        },

        updateOnHold: function() {
            this.scores[this.currentPlayer] += this.roundScore;
            this.nextPlayer();
            display(this);
        },

        nextPlayer: function() {
            if(!this.isFinished()) {
                this.currentPlayer = (this.currentPlayer + 1) % this.playersNr;
                this.roundScore = 0;
                this.previousDice = -1;
            }
        }
    }
}

function display(game) {

    var activePane = firstElemWithClass('active');
    if(activePane) {
        activePane.classList.remove('active');
    }

    var scoresDiv = document.getElementsByClassName('player-score');
    [...scoresDiv].forEach((elem, idx) => elem.innerText = game.scores[idx]);

    var roundsDiv = document.getElementsByClassName('player-current-score');
    [...roundsDiv].forEach((elem, idx) => {
        if(idx === game.currentPlayer) {
            elem.innerText = game.roundScore;
        }
        else {
            elem.innerText = '0';
        }
    })

    var wrapper = firstElemWithClass('wrapper');
    if(game.isFinished()) {
        document.getElementsByClassName('player-name')[game.currentPlayer].innerText = "WINNER";
        wrapper.children[game.currentPlayer].classList.add('winner');
        toggleDisplay(['btn-roll', 'btn-hold', 'dice'], true);
    }
    else {
        wrapper.children[game.currentPlayer].classList.add('active');
    }
}

function rollDice() {

    if(!GAME.isFinished()) {
        document.querySelector('.dice').classList.remove('hide');
        var btns = ['btn-new', 'btn-roll', 'btn-hold'];
        toggleDiceShake();
        toggleDisplay(btns, true);

        var shuffled = shuffle([1, 2, 3, 4, 5, 6]);
        var diceRoll = random(1, shuffled.length);
        for(var i = 0; i < shuffled.length; ++i) {
            var next;
            if(i === shuffled.length - 1) {
                next = () => changeDice(diceRoll, () => {
                    toggleDiceShake();
                    GAME.updateOnRoll(diceRoll);
                    toggleDisplay(btns, false);
                });
            }
            window.setTimeout(changeDice, (i+1) * 100, shuffled[i], next);
        }
    }
}

function changeDice(faceNr, next) {
    var diceElem = firstElemWithClass('dice');
    diceElem.src = `./img/dice-${faceNr}.png`;
    if(next) {
        next();
    }
}

function toggleDiceShake() {
    var diceElem = firstElemWithClass('dice');
    diceElem.classList.toggle('shake');
}

function toggleDisplay(classNames, hide) {
    classNames.forEach(name => {
        if(hide) {
            firstElemWithClass(name).classList.add('hide');
        }
        else {
            firstElemWithClass(name).classList.remove('hide');
        }
    })
}

function shuffle(arr) {
    for(var i = arr.length - 1; i >= 0; --i) {
        var replaceWithIdx = random(0, i);
        var temp = arr[i];
        arr[i] = arr[replaceWithIdx];
        arr[replaceWithIdx] = temp;
    }
    return arr;
}

function random(min, max) {
    return  Math.floor(Math.random() * max + min)
}