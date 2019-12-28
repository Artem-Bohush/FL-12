function countNumbers(str) {
  const stat = {};
  for (let char of str) {
    if (!isNaN(char)) {
      stat[char] ? (stat[char] += 1) : (stat[char] = 1);
    }
  }
  console.log(stat);
}
countNumbers('erer384jj4444666888jfd123');
// => {'1': 1, '2': 1, '3': 2, '4': 5, '6': 3, '8': 4}
countNumbers('jdjjka000466588kkkfs662555');
// => {'0': 3, '2': 1, '4': 1, '5': 4, '6': 4, '8': 2}
countNumbers(''); // => {}
