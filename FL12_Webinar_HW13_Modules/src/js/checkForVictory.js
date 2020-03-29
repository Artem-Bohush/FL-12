export default function (player) {
  const winningCombinations = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];

  let isWinner = false;
  const { selectedFields } = player;
  winningCombinations.forEach((comb, index) => {
    if (selectedFields.includes(comb[0])
      && selectedFields.includes(comb[1])
      && selectedFields.includes(comb[2])) {
      isWinner = true;
      document.querySelector('.game-grid').classList.add(`game-over-${index}`);
    }
  });
  return isWinner;
}
