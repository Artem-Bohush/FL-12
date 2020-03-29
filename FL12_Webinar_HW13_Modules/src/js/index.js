import '../scss/index.scss';
import Player from './Player';
import decideWhoStarts from './decideWhoStarts';
import togglePlayer from './togglePlayer';
import setScore from './setScore';
import checkForVictory from './checkForVictory';

const player1 = new Player('Player 1');
const player2 = new Player('Player 2');
const playerNameInputs = Array.from(document.getElementsByClassName('player-name'));
const message = document.querySelector('.game-message');
const gameField = document.querySelector('.game-grid');
const fields = Array.from(document.querySelectorAll('.field'));
const controlBtns = Array.from(document.querySelector('.game-control').getElementsByTagName('button'));
let attempt = 0;

setScore(player1, player2);
decideWhoStarts(player1, player2);

playerNameInputs.forEach((input, idx) => {
  if (!idx) {
    input.value = player1.name;
    input.addEventListener('blur', e => {
      if (e.target.value.trim()) {
        player1.name = e.target.value;
      }
      e.target.value = player1.name;
    });
  } else {
    input.value = player2.name;
    input.addEventListener('blur', e => {
      if (e.target.value.trim()) {
        player2.name = e.target.value;
      }
      e.target.value = player2.name;
    });
  }
});

function selectField(e) {
  attempt += 1;
  const activePlayer = player1.myTurn ? player1 : player2;
  activePlayer.selectField(Number(e.target.id));

  e.target.classList.add(activePlayer.mySign);
  e.target.removeEventListener('click', selectField);

  const isWinner = checkForVictory(activePlayer);
  if (isWinner) {
    activePlayer.addVictory();
    setScore(player1, player2);
    fields.forEach(field => {
      field.removeEventListener('click', selectField);
    });
    message.textContent = `${activePlayer.name} won!`;
  } else {
    if (attempt === 9) {
      player1.addVictory();
      player2.addVictory();
      setScore(player1, player2);
      message.textContent = 'Draw!';
    } else {
      togglePlayer(player1, player2);
    }
  }
}

fields.forEach(field => {
  field.addEventListener('click', selectField);
});

function removeRowHighlight() {
  const classes = Array.from(gameField.classList.values());
  if (classes.length !== 1) {
    gameField.classList.remove(classes[1]);
  }
}

controlBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    fields.forEach(field => {
      attempt = 0;
      field.classList.remove('cross');
      field.classList.remove('circle');
      field.addEventListener('click', selectField);
      decideWhoStarts(player1, player2);
      player1.resetSelectedFields();
      player2.resetSelectedFields();
      message.textContent = '';
      if (btn.classList.contains('reset-game')) {
        player1.resetScore();
        player2.resetScore();
        setScore(player1, player2);
      }
    });
    removeRowHighlight();
  });
});
