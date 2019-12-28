function makeNumber(str) {
  let numStr = [];
  for (let char of str) {
    if (!isNaN(char)) {
      numStr.push(char);
    }
  }
  console.log(numStr.join(''));
}
makeNumber('erer384jjjfd123');//=>384123
makeNumber('123098h76gfdd');//=>12309876
makeNumber('ijifjgdj');//=> should return empty string ->''
