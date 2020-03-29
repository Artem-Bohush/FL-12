export default function (player1, player2) {
  player1.myTurn = !player1.myTurn;
  player2.myTurn = !player2.myTurn;

  const playerNames = Array.from(document.getElementsByClassName('player-name'));
  playerNames[0].classList.toggle('highlighted-player');
  playerNames[1].classList.toggle('highlighted-player');
}
