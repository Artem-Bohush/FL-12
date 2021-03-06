//------------------------------------------1---------------------------------------------

function convert(...numbers) {
  const outArr = [];
  for (let item of numbers) {
    typeof item === 'string' ? outArr.push(Number(item)) : outArr.push(String(item));
  }
  return outArr;
}

console.log(convert('1', 2, 3, '4'));// [1, '2', '3', 4]

//------------------------------------------2---------------------------------------------

function executeforEach(arr, callback) {
  for (let i = 0; i < arr.length; i++) {
    arr[i] = callback(arr[i]);
  }
}

executeforEach([1, 2, 3], function (el) {
  console.log(el * 2)
}) // logs 2 4 6

//------------------------------------------3---------------------------------------------

function mapArray(arr, callback) {
  for (let i = 0; i < arr.length; i++) {
    arr[i] = +arr[i];
  }
  executeforEach(arr, callback)
  return arr;
}

console.log(mapArray([2, '5', 8], function (el) {
  return el + 3
})); // returns [5, 8, 11]

//------------------------------------------4---------------------------------------------

function filterArray(arr, callback) {
  const copyArr = [];
  for (let item of arr) {
    copyArr.push(item);
  }
  executeforEach(copyArr, callback);
  const filteredArr = [];
  for (let i = 0; i < copyArr.length; i++) {
    if (copyArr[i] === true) {
      filteredArr.push(arr[i]);
    }
  }
  return filteredArr;
}

console.log(filterArray([2, 5, 8], function (el) {
  return el % 2 === 0
}));// returns [2, 8]

//------------------------------------------5---------------------------------------------

function flipOver(str) {
  const strArr = [];
  for (let char of str) {
    strArr.push(char);
  }
  let outStr = '';
  for (let i = strArr.length - 1; i >= 0; i--) {
    outStr += strArr[i];
  }
  return outStr;
}

console.log(flipOver('hey world')); // 'dlrow yeh'

//------------------------------------------6---------------------------------------------

function makeListFromRange(arr) {
  const outArr = [];
  for (let i = arr[0]; i <= arr[1]; i++) {
    outArr.push(i);
  }
  return outArr;
}

console.log(makeListFromRange([2, 7])); // [2, 3, 4, 5, 6, 7]

//------------------------------------------7---------------------------------------------

const actors = [
  { name: 'tommy', age: 36 },
  { name: 'lee', age: 28 }
];

function getArrayOfKeys(arr, key) {
  const copyArr = [];
  for (let item of arr) {
    copyArr.push(item)
  }
  executeforEach(copyArr, el => {
    return el[key]
  })
  return copyArr;
}

console.log(getArrayOfKeys(actors, 'name')); // [‘tommy’, ‘lee’]

//------------------------------------------8---------------------------------------------

function substitute(arr) {
  const copyArr = [];
  for (let item of arr) {
    copyArr.push(item);
  }
  mapArray(copyArr, el => {
    return el < 30 ? '*' : el;
  })
  return copyArr;
}

console.log(substitute([58, 14, 48, 2, 31, 29])); // [58, '*', 48, '*', 31, '*']

//------------------------------------------9---------------------------------------------

const date = new Date(2019, 0, 2);

function getPastDay(date, daysAgo) {
  let dateCopy = new Date(date);
  dateCopy.setDate(date.getDate() - daysAgo);
  return dateCopy.getDate();
}

console.log(getPastDay(date, 1)); // 1, (1 Jan 2019)
console.log(getPastDay(date, 2)); // 31, (31 Dec 2018)
console.log(getPastDay(date, 365)); // 2, (2 Jan 2018)

//------------------------------------------10---------------------------------------------

function formatDate(date) {
  const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
  const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${hours}:${minutes}`
}

console.log(formatDate(new Date('6/15/2018 09:15:00'))); // "2018/6/15 09:15"
console.log(formatDate(new Date())); // "2020/1/7 12:56" // gets current local time
