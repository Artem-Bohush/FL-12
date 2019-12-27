if (confirm('Do you want to play a game?')) {
  let isContinue = false;
  let isAgain = true;
  const gameInfo = {
    attemptsLeft: 3,
    totalPrize: 0,
    0: 100,
    1: 50,
    2: 25
  }
  firstGame:
  while (isAgain) {
    let randNum = Math.round(-0.5 + Math.random() * 9);
    console.log(randNum);
    for (let i = 0; i < 3; i++) {
      let userNum = +prompt(
        'Choose a roulette pocket number from 0 to 8\n' +
        `Attempts left: ${gameInfo.attemptsLeft}\n` +
        `Total prize: ${gameInfo.totalPrize}$\n` +
        `Possible prize on current attempt: ${gameInfo[i]}$`
      );
      if (userNum !== randNum && i === 2) {
        alert(`Thank you for your participation. Your prize is: ${gameInfo.totalPrize}$`);
        isAgain = confirm('Do you want to paly again?');
        break;
      } else if (userNum === randNum) {
        if (i === 0) {
          gameInfo.totalPrize += gameInfo[i];
          isContinue = confirm(`Congratulation, you won! Your prize is: ${gameInfo.totalPrize}$. ` +
            'Do you want to continue?');
          if (isContinue) {
            break firstGame;
          } else {
            alert(`Thank you for your participation. Your prize is: ${gameInfo.totalPrize}$`);
            isAgain = confirm('Do you want to paly again?');
          }
        } else if (i === 1) {
          gameInfo.totalPrize += gameInfo[i];
          isContinue = confirm(`Congratulation, you won! Your prize is: ${gameInfo.totalPrize}$. ` +
            'Do you want to continue?');
          if (isContinue) {
            break firstGame;
          } else {
            alert(`Thank you for your participation. Your prize is: ${gameInfo.totalPrize}$`);
            isAgain = confirm('Do you want to paly again?');
          }
        } else {
          gameInfo.totalPrize += gameInfo[i];
          isContinue = confirm(`Congratulation, you won! Your prize is: ${gameInfo.totalPrize}$. ` +
            'Do you want to continue?');
          if (isContinue) {
            break firstGame;
          } else {
            alert(`Thank you for your participation. Your prize is: ${gameInfo.totalPrize}$`);
            isAgain = confirm('Do you want to paly again?');
          }
        }
        break;
      }
      gameInfo.attemptsLeft -= 1;
    }
    gameInfo.attemptsLeft = 3;
  }
  while (isContinue) {
    gameInfo.attemptsLeft = 3;
    let randNum = Math.round(-0.5 + Math.random() * 13);
    console.log(randNum);
    for (let i = 0; i < 3; i++) {
      let userNum = +prompt(
        'Choose a roulette pocket number from 0 to 12\n' +
        `Attempts left: ${gameInfo.attemptsLeft}\n` +
        `Total prize: ${gameInfo.totalPrize}$\n` +
        `Possible prize on current attempt: ${gameInfo[i] * 2}$`
      );
      if (userNum !== randNum && i === 2) {
        alert(`Thank you for your participation. Your prize is: ${gameInfo.totalPrize}$`);
        isContinue = confirm('Do you want to paly again?');
        break;
      } else if (userNum === randNum) {
        switch (i) {
          case 0:
            gameInfo.totalPrize += gameInfo[i] * 2;
            isContinue = confirm(`Congratulation, you won! Your prize is: ${gameInfo.totalPrize}$. ` +
              'Do you want to paly again?');
            break;
          case 1:
            gameInfo.totalPrize += gameInfo[i] * 2;
            isContinue = confirm(`Congratulation, you won! Your prize is: ${gameInfo.totalPrize}$. ` +
              'Do you want to paly again?');
            break;
          default:
            gameInfo.totalPrize += gameInfo[i] * 2;
            isContinue = confirm(`Congratulation, you won! Your prize is: ${gameInfo.totalPrize}$. ` +
              'Do you want to paly again?');
        }
        break;
      }
      gameInfo.attemptsLeft -= 1;
    }
  }
} else {
  alert('You did not become a billionaire, but can');
}
