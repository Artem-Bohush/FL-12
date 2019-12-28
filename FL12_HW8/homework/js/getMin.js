function getMin(firstArg) {
  let min = firstArg;
  for (let num in getMin.arguments) {
    if (getMin.arguments[num] < min) {
      min = getMin.arguments[num];
    }
  }
  console.log(min);
}
getMin(3, 0, -3);