/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var GAME;
newGame(2, 10);
addHandlers();

function addHandlers() {
    firstElemWithClass('btn-new').addEventListener('click', () => newGame(2, 10));
    firstElemWithClass('btn-roll').addEventListener('click', rollDice);
    firstElemWithClass('btn-hold').addEventListener('click', () => {
        if(!GAME.isFinished()) {
            GAME.updateOnHold()
        }
    });
}

function newGame(playersNr, endScore) {
    GAME = initGame(playersNr, endScore);
    var winner = document.getElementsByClassName('winner');
    if(winner.length !== 0) {
        winner[0].classList.remove('winner');
    }
    toggleBtnDisplay(['btn-roll', 'btn-hold'], false);
    display(GAME);
}

function firstElemWithClass(className) {
    return document.getElementsByClassName(className)[0];
}

function initGame(playersNr, endScore) {
    return {
        playersNr: playersNr,
        currentPlayer: 0,
        scores: new Array(playersNr).fill(0),
        roundScore: 0,
        endScore: endScore,
        winner: -1,

        getWinner: function () {
            for(var i = 0; i < this.scores.length; ++i) {
                if(this.scores[i] >= endScore) {
                    return i;
                }
            }
            return -1;
        },

        isFinished: function() {
            return this.winner !== -1;
        },

        updateOnRoll: function(diceRoll) {
            if(diceRoll !== 1) {
                this.roundScore += diceRoll;
            }
            else {
                this.nextPlayer();
            }
            display(this);
        },

        updateOnHold: function() {
            this.scores[this.currentPlayer] += this.roundScore;
            this.nextPlayer();
            this.winner = this.getWinner();
            display(this);
        },

        nextPlayer: function() {
            if(!this.isFinished()) {
                this.currentPlayer = (this.currentPlayer + 1) % this.playersNr;
                this.roundScore = 0;
            }
        }
    }
}

function display(game) {

    var activePane = firstElemWithClass('active');
    activePane.classList.toggle('active');

    var wrapper = firstElemWithClass('wrapper');
    wrapper.children[game.currentPlayer].classList.toggle('active');

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

    if(game.isFinished()) {
        wrapper.children[game.winner].classList.add('winner');
        toggleBtnDisplay(['btn-roll', 'btn-hold'], true);
    }
}

function rollDice() {

    if(!GAME.isFinished()) {
        var btns = ['btn-new', 'btn-roll', 'btn-hold'];
        toggleDiceShake();
        toggleBtnDisplay(btns, true);

        var shuffled = shuffle([1, 2, 3, 4, 5, 6]);
        var diceRoll = random(1, shuffled.length);
        for(var i = 0; i < shuffled.length; ++i) {
            var next;
            if(i === shuffled.length - 1) {
                next = () => changeDice(diceRoll, () => {
                    toggleDiceShake();
                    GAME.updateOnRoll(diceRoll);
                    toggleBtnDisplay(btns, false);
                });
            }
            window.setTimeout(changeDice, (i+1) * 200, shuffled[i], next);
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

function toggleBtnDisplay(btns, hide) {
    btns.forEach(btn => {
        if(hide) {
            firstElemWithClass(btn).classList.add('hide');
        }
        else {
            firstElemWithClass(btn).classList.remove('hide');
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