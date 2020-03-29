import getRandomInteger from './getRandomInteger';

export default function (player1, player2) {
  const playerNames = Array.from(document.getElementsByClassName('player-name'));
  playerNames[0].classList.remove('highlighted-player');
  playerNames[1].classList.remove('highlighted-player');

  if (getRandomInteger(0, 1) === 0) {
    player1.myTurn = true;
    player1.mySign = 'cross';
    playerNames[0].classList.add('highlighted-player');
    player2.myTurn = false;
    player2.mySign = 'circle';
  } else {
    player1.myTurn = false;
    player1.mySign = 'circle';
    player2.myTurn = true;
    player2.mySign = 'cross';
    playerNames[1].classList.toggle('highlighted-player');
  }
}
