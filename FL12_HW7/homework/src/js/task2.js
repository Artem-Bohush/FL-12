if (confirm('Do you want to play a game?')) {
  let isContinue = true;
  const gameInfo = {
    attemptsLeft: 3,
    totalPrize: 0,
    0: 100,
    1: 50,
    2: 25
  }
  do {
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
        isContinue = confirm('Do you want to paly again?');
        break;
      } else if (userNum === randNum) {
        switch (i) {
          case 0:
            gameInfo.totalPrize += gameInfo[i];
            isContinue = confirm(`Congratulation, you won! Your prize is: ${gameInfo.totalPrize}$. ` +
              'Do you want to continue?');
            break;
          case 1:
            gameInfo.totalPrize += gameInfo[i];
            isContinue = confirm(`Congratulation, you won! Your prize is: ${gameInfo.totalPrize}$. ` +
              'Do you want to continue?');
            break;
          default:
            gameInfo.totalPrize += gameInfo[i];
            isContinue = confirm(`Congratulation, you won! Your prize is: ${gameInfo.totalPrize}$. ` +
              'Do you want to continue?');
        }
        break;
      }
      gameInfo.attemptsLeft -= 1;
    }
    gameInfo.attemptsLeft = 3;
  } while (isContinue)
  alert(`Thank you for your participation. Your prize is: ${gameInfo.totalPrize}$`);
  isContinue = confirm('Do you want to paly again?');
  while (isContinue) {
    let randNum = Math.round(-0.5 + Math.random() * 13);
    console.log(randNum);
    // gameInfo.attemptsLeft = 3;
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
              'Do you want to continue?');
            break;
          case 1:
            gameInfo.totalPrize += gameInfo[i] * 2;
            isContinue = confirm(`Congratulation, you won! Your prize is: ${gameInfo.totalPrize}$. ` +
              'Do you want to continue?');
            break;
          default:
            gameInfo.totalPrize += gameInfo[i] * 2;
            isContinue = confirm(`Congratulation, you won! Your prize is: ${gameInfo.totalPrize}$. ` +
              'Do you want to continue?');
        }
        break;
      }
      gameInfo.attemptsLeft -= 1;
    }
    gameInfo.attemptsLeft = 3;
  }
} else {
  alert('You did not become a billionaire, but can');
}
