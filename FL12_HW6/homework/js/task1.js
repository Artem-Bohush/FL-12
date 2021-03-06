const a = prompt('Enter number a:');
const b = prompt('Enter number b:');
const c = prompt('Enter number c:');
if (!isNaN(a) && +a !== 0 && a !== '' &&
  !isNaN(b) && b !== null && b !== '' &&
  !isNaN(c) && c !== null && c !== '') {
  const d = b * b - 4 * a * c;
  if (d > 0) {
    const x1 = ((-b + Math.sqrt(d)) / (2 * a)).toFixed(3);
    const x2 = ((-b - Math.sqrt(d)) / (2 * a)).toFixed(3);
    console.log(`x1 = ${x1} and x2 = ${x2}`);
  } else if (d === 0) {
    console.log(`x = ${-b / 2 * a}`);
  } else {
    console.log('no solution');
  }
} else {
  console.log('Invalid input data');
}