let a = prompt('Enter number a:');
let b = prompt('Enter number b:');
let c = prompt('Enter number c:');

if (a === '' || a === undefined ||
  b === '' || b === undefined ||
  c === '' || c === undefined) {
  alert('input values should be ONLY numbers');
} else if (a === 0 || b === 0 || c === 0) {
  alert('A triangle must have 3 sides with a positive definite length');
} else {
  a = +a;
  b = +b;
  c = +c;
  if (a + b > c && a + c > b && b + c > a) {
    if (a === b && b === c) {
      alert('Equilateral triangle');
    } else if (a === b || a === c || b === c) {
      alert('Isosceles triangle');
    } else {
      alert('Scalene triangle');
    }
  } else {
    alert('Triangle doesn’t exist');
  }
}