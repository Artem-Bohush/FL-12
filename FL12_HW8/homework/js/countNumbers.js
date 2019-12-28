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
countNumbers('jdjjka000466588kkkfs662555');
countNumbers('');
