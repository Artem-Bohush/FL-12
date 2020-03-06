export default function (step, userSymbol, compSymbol, winner) {
  const resultElement = document.createElement('p');
  let message = '';

  if (winner === 'user') {
    message += `Round ${step}, ${userSymbol} vs.${compSymbol}, You’ve WON!`;
  } else if (winner === 'computer') {
    message += `Round ${step}, ${userSymbol} vs.${compSymbol}, You’ve LOST!`;
  } else {
    message += `Round ${step}, ${userSymbol} vs.${compSymbol}, DRAW!`;
  }

  resultElement.innerText = message;
  document.querySelector('.step-result').append(resultElement);
}
