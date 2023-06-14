const numberElm = document.querySelector('.number');
const messageElm = document.querySelector('.message');
const scoreElm = document.querySelector('.score');
const highscoreElm = document.querySelector('.highscore');
const guessInput = document.querySelector('.guess');
const body = document.querySelector('body');

let secretNumber = Math.trunc(Math.random() * 100) + 1;
let score = 20;
let highscore = JSON.parse(localStorage.getItem('high')) || 0;
if (highscore > 20 || isNaN(Number(highscore))) {
  localStorage.removeItem('high');
  highscore = 0;
}
highscoreElm.textContent = highscore;

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(guessInput.value);
  if (!guess || guess % 1 !== 0) {
    messageElm.textContent = '⛔ Invalid Number!';
  } else if (guess === secretNumber) {
    messageElm.textContent = '🎉 Correct Number!';
    body.style.backgroundColor = '#60b347';
    numberElm.style.width = '200px';
    numberElm.textContent = secretNumber;

    if (score > highscore) {
      highscore = score;
      localStorage.setItem('high', JSON.stringify(highscore));
      highscoreElm.textContent = highscore;
    }
  } else if (guess !== secretNumber && guess >= 1 && guess <= 100) {
    if (score > 1) {
      messageElm.textContent =
        guess > secretNumber ? '📈 Too high!' : '📉 Too low!';
      score--;
      scoreElm.textContent = score;
    } else {
      messageElm.textContent = '💥 Game Over!';
      scoreElm.textContent = 0;
    }
  } else {
    messageElm.textContent = '⛔ Between 1 and 100!';
  }
});
document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 100) + 1;
  messageElm.textContent = 'Start guessing ...';
  numberElm.textContent = '?';
  scoreElm.textContent = score;
  body.style.backgroundColor = '#000';
  numberElm.style.width = '96px';
  guessInput.value = '';
});
