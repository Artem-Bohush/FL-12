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

function findUniqueElements(arr) {
  const uniqueElements = new Set();
  arr.forEach(el => uniqueElements.add(el));
  return Array.from(uniqueElements);
}

const array = [1, 1, 23, 3, 4, 5, 6, 5, 4, 23, 2, 1, 1, 1, 1, 1];
console.log(findUniqueElements(array));