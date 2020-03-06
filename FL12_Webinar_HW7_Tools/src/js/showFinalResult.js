export default function (winner) {
  const finalResultTitle = document.createElement('h3');
  const finalResultImgDiv = document.createElement('div');
  finalResultImgDiv.classList.add('result-img');
  const finalResultImg = document.createElement('img');
  finalResultImg.alt = 'result-img';
  let message = '';

  if (winner === 'user') {
    message += 'The winner is YOU! Congratulations!';
    finalResultImg.src = './img/png/win-case.png';
  } else if (winner === 'computer') {
    message += 'The winner is COMPUTER! I\'m sorry.';
    finalResultImg.src = './img/png/lose-case.png';
  } else {
    message += 'The game ended in a draw! Not bad, man.';
    finalResultImg.src = './img/png/draw-case.png';
  }

  finalResultImgDiv.appendChild(finalResultImg);
  finalResultTitle.innerText = message;
  document.querySelector('.final-result').appendChild(finalResultTitle).appendChild(finalResultImgDiv);
}