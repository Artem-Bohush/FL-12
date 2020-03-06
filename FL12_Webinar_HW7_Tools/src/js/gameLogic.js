import generateStepResult from './generateStepResult';
import showFinalResult from './showFinalResult';

export default function () {
  const stat = {
    user: 0,
    computer: 0,
    step: 0,
  };

  const symbolBtns = document.querySelector('.btn-group');

  function gameHandler(e) {
    const { target } = e;
    if (target.nodeName === 'BUTTON') {
      document.getElementById('loader').style.display = 'block';
      symbolBtns.removeEventListener('click', gameHandler);

      setTimeout(() => {
        document.getElementById('loader').style.display = 'none';

        if (target.classList.contains('rock')) {
          stat.step += 1;
          const winner = generateStepResult('rock', stat.step);
          if (winner !== 'draw') {
            stat[winner] += 1;
          }
        } else if (target.classList.contains('paper')) {
          stat.step += 1;
          const winner = generateStepResult('paper', stat.step);
          if (winner !== 'draw') {
            stat[winner] += 1;
          }
        } else if (target.classList.contains('scissors')) {
          stat.step += 1;
          const winner = generateStepResult('scissors', stat.step);
          if (winner !== 'draw') {
            stat[winner] += 1;
          }
        }

        if (stat.step === 3) {
          symbolBtns.removeEventListener('click', gameHandler);
          let winner = '';
          if (stat.user > stat.computer) {
            winner = 'user';
          } else if (stat.user < stat.computer) {
            winner = 'computer';
          }
          showFinalResult(winner);
        } else {
          symbolBtns.addEventListener('click', gameHandler);
        }
      }, 1000);
    }
  }

  symbolBtns.addEventListener('click', gameHandler);

  document.querySelector('.reset').addEventListener('click', () => {
    const stepResultParent = document.querySelector('.step-result');
    while (stepResultParent.lastChild) {
      if (stepResultParent.lastChild.id) {
        break;
      } else {
        stepResultParent.removeChild(stepResultParent.lastChild);
      }
    }

    const finalResultParent = document.querySelector('.final-result');
    while (finalResultParent.firstChild) {
      finalResultParent.removeChild(finalResultParent.firstChild);
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const key in stat) {
      if (Object.prototype.hasOwnProperty.call(stat, key)) {
        stat[key] = 0;
      }
    }

    symbolBtns.addEventListener('click', gameHandler);
  });
}
