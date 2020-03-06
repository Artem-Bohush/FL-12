import addStepResult from './addStepResult';

export default function (userSymbol, step) {
  const symbols = ['rock', 'scissors', 'paper'];
  const winCases = ['rock->scissors', 'scissors->paper', 'paper->rock'];
  const drawCases = ['rock->rock', 'scissors->scissors', 'paper->paper'];

  const randIndex = Math.round(-0.5 + Math.random() * 3);
  const stepCase = `${userSymbol}->${symbols[randIndex]}`;
  let winner = '';

  if (winCases.includes(stepCase)) {
    addStepResult(step, userSymbol, symbols[randIndex], 'user');
    winner = 'user';
  } else if (drawCases.includes(stepCase)) {
    addStepResult(step, userSymbol, symbols[randIndex]);
    winner = 'draw';
  } else {
    addStepResult(step, userSymbol, symbols[randIndex], 'computer');
    winner = 'computer';
  }

  return winner;
}
