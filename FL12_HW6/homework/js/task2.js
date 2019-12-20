const a = +prompt('Enter number a:');
const b = +prompt('Enter number b:');
const c = +prompt('Enter number c:');
if (isNaN(a) || isNaN(b) || isNaN(c)) {
  alert('input values should be ONLY numbers');
} else if (a <= 0 || b <= 0 || c <= 0) {
  alert('A triangle must have 3 sides with a positive definite length');
} else {
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
