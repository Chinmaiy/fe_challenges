/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var GAME;
var DICE_VALUES = [1, 2, 3, 4, 5, 6];
var DICE_NR = document.getElementsByClassName('dice').length;
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
    toggleDisplay(['btn-roll', 'btn-hold'], { remove: 'hide'});
    toggleDisplay(['dice'], { add: 'hide'});

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

        isFinished: function() {
            return this.scores[this.currentPlayer] >= endScore;
        },

        rolledOne: function(diceRoll) {
            return diceRoll.filter(dice => dice === 1).length !== 0;
        },

        updateOnRoll: function(diceRoll) {
            if(this.rolledOne(diceRoll)) {
                this.nextPlayer();
            }
            else {
                this.roundScore += diceRoll.reduce((acc, dice) => acc + dice);
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
        toggleDisplay(['btn-roll', 'btn-hold', 'dice'], { add: 'hide' });
    }
    else {
        wrapper.children[game.currentPlayer].classList.add('active');
    }
}

function rollDice() {

    if(!GAME.isFinished()) {
        toggleDisplay(['dice'], { remove: 'hide', add: 'shake' });

        var btns = ['btn-new', 'btn-roll', 'btn-hold'];
        toggleDisplay(btns, { add: 'hide' });

        var shuffled = shuffledDecks(DICE_NR, DICE_VALUES);
        var diceRoll = randomSet(DICE_NR, DICE_VALUES[0], DICE_VALUES[DICE_VALUES.length - 1]);
        for(var i = 0; i < shuffled.length; ++i) {
            var next;
            if(i === DICE_VALUES.length - 1) {
                next = () => changeDice(diceRoll, () => {
                    toggleDisplay(['dice'], { remove: 'shake'})
                    GAME.updateOnRoll(diceRoll);
                    toggleDisplay(btns, { remove: 'hide'});
                });
            }
            window.setTimeout(changeDice, (i+1) * 200, shuffled[i], next);
        }
    }
}

function changeDice(faceNrs, next) {
    var diceElems = document.getElementsByClassName('dice');
    for(var i = 0; i < diceElems.length; ++i) {
        diceElems[i].src = `./img/dice-${faceNrs[i]}.png`;
    }
    if(next) {
        next();
    }
}

function toggleDisplay(classNamesSelectors, classesInfo) {
    classNamesSelectors.map(name => [...document.getElementsByClassName(name)])
        .flatMap(elem => elem)
        .forEach(elem => {
            if(classesInfo.add) {
                classesInfo.add.split(" ").forEach(cls => elem.classList.add(cls));
            }

            if(classesInfo.remove) {
                classesInfo.remove.split(" ").forEach(cls => elem.classList.remove(cls));
            }
        });
}

function shuffledDecks(deckSize, values) {
    var shuffled = [];
    for(var i = 0; i < deckSize; ++i) {
        shuffled.push(shuffle(values));
    }

    var decks = [];
    for(var i = 0; i < values.length; ++i) {
        var deck = [];
        for(var j = 0; j < deckSize; ++j) {
            deck.push(shuffled[j][i]);
        }
        decks.push(deck);
    }
    return decks;
}

function shuffle(arr) {
    var copy = arr.slice();
    for(var i = copy.length - 1; i >= 0; --i) {
        var replaceWithIdx = random(0, i);
        var temp = copy[i];
        copy[i] = copy[replaceWithIdx];
        copy[replaceWithIdx] = temp;
    }
    return copy;
}

function randomSet(nr, min, max) {
    var arr = []
    for(var i = 0; i < nr; ++i) {
        arr.push(random(min, max));
    }
    return arr;
}

function random(min, max) {
    return  Math.floor(Math.random() * max + min)
}