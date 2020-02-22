// ----------------------------Task1----------------------------------

// function maxElement(arr) {
//   return Math.max(...arr);
// }

// const array = [1, 2, 3, 4, 56, 7, 8, 76, 0, -4, 241, 5, 567, 2];

// console.log(maxElement(array));

// ----------------------------Task2----------------------------------

// function copyArray(arr) {
//   return new Array(...arr);
// }

// const array = [1, 2, 3, 4, 5];
// const copiedArray = copyArray(array);
// console.log(copiedArray, array);
// console.log(copiedArray === array);

// ----------------------------Task3----------------------------------

// function addUniqueId(obj) {
//   const enhancedObj = {};
//   let rand = 1 + Math.random() * (1000 + 1 - 1);
//   enhancedObj[Symbol('uniqueId')] = Math.floor(rand);
//   return Object.assign(enhancedObj, obj);
// }

// const testObj = { name: 123 };
// const enhancedObj = addUniqueId(testObj);

// console.log(testObj === enhancedObj);
// console.log(testObj);
// console.log(enhancedObj);

// ----------------------------Task4----------------------------------
/*
function regroupObject(obj) {
  const regroupedObj = {};
  const {name, id, age, university } = obj;
  console.log(name, age);
}

const oldObj = {
  name: 'Someone',
  details: {
    id: 1,
    age: 21,
    university: 'UNI'
  }
}

regroupObject(oldObj);
*/

// ----------------------------Task5----------------------------------

// function findUniqueElements(arr) {
//   const uniqueElements = new Set();
//   arr.forEach(el => uniqueElements.add(el));
//   return Array.from(uniqueElements);
// }

// const array = [1, 1, 23, 3, 4, 5, 6, 5, 4, 23, 2, 1, 1, 1, 1, 1];
// console.log(findUniqueElements(array));

// ----------------------------Task6----------------------------------

// function hideNumber(str) {
//   const lastNumStr = str.split('').splice(-4).join('');
//   return lastNumStr.padStart(10, '*');
// }

// const phoneNumber = '0123456789';
// console.log(hideNumber(phoneNumber));

// ----------------------------Task7----------------------------------

// function add(a = alarm(), b = alarm()) {
//   return a + b;
// }

// function alarm() {
//   throw new Error('Missing property')
// }

// console.log(add(1, 3));
// console.log(add(1));

// ----------------------------Task8----------------------------------

// let url = 'https://jsonplaceholder.typicode.com/users';

// function getNames1(url) {
//   return fetch(url)
//     .then(response => response.json())
//     .then(usersArr => {
//       const onlyNames = usersArr.map(userData => userData.username);
//       return onlyNames.sort();
//     })
//     .catch(error => console.log(`ERROR: ${error.stack}`));
// }
// getNames1(url).then(data => console.log(data));

// ----------------------------Task9----------------------------------

// async function getNames2(url) {
//   try {
//     const response = await fetch(url);
//     const usersArr = await response.json();
//     const onlyNames = usersArr.map(userData => userData.username);
//     return onlyNames.sort();
//   }
//   catch (e) {
//     console.log(`ERROR: ${e}`);
//   }
// }
// getNames2(url).then(data => console.log(data));