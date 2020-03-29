export default function (player1, player2) {
  const score = document.querySelector('.score');
  score.textContent = `${player1.score} : ${player2.score}`;
}
