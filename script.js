'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
// clearing the dom elements
// selecting elements
const score0El = document.querySelector('#score--0');
// getElementById is little bit faster
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
// catch buttons
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const holdEl = document.querySelector('.btn--hold');

let scores, totalScore, currentScore, maxScore, activePlayer, gameOver;
// startting condition
const init = function () {
    maxScore = 50;
    scores = [0, 0];
    gameOver = false;
    activePlayer = 0;
    currentScore = 0;
    score0El.textContent = 0;
    score1El.textContent = 0;
    diceEl.classList.add('hidden');

    current0El.textContent = 0;
    current1El.textContent = 0;
    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
};

init();

// rolling dice functionallity
const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
    if (!gameOver) {
        // 1. generating dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;

        // 2. display dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;

        // 3. check for rolled 1: if true
        if (dice !== 1) {
            // Add dice to current score
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent =
                currentScore;
        } else {
            // Switch to next player
            switchPlayer();
        }
    }
});

holdEl.addEventListener('click', function () {
    if (!gameOver) {
        // 1. Add current score to active player's score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent =
            scores[activePlayer];

        // 2. Players win if score>=100
        // finish the game
        if (scores[activePlayer] >= maxScore) {
            gameOver = true;
            document.querySelector('.modal').classList.remove('hidden');
            document.querySelector('.overlay').classList.remove('hidden');
            document.querySelector('.congrates-player').textContent =
                activePlayer === 0 ? 'Player 1' : 'Player 2';
            // dic
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.add('player--winner');
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.remove('player--active');
            currentScore = 0;
        } else {
            // 3. Switch to next player
            switchPlayer();
        }
    }
});

document.querySelector('.btn--new').addEventListener('click', init);

// close modal
const closeModal = function () {
    document.querySelector('.modal').classList.add('hidden');
    document.querySelector('.overlay').classList.add('hidden');
    init();
};
document.querySelector('.close-modal').addEventListener('click', closeModal);

document.addEventListener('keydown', function (event) {
    console.log(event.key);
    if (event.key === 'Escape' || event.key === 'Enter') closeModal();
});

document.querySelector('.overlay').addEventListener('click', closeModal);
