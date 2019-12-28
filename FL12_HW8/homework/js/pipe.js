function addOne(x) {
  return x + 1;
}
function pipe(num, ...args) {
  let pass = num;
  for (let func of args) {
    let temp = func(pass);
    pass = temp;
  }
  console.log(pass);
}
pipe(1, addOne);//=> 2
pipe(1, addOne, addOne);//=> 3