export default class Player {
  constructor(name) {
    this._name = name;
    this._score = 0;
    this._myTurn = false;
    this._mySign = '';
    this._selectedFields = [];
  }

  selectField(fieldNumber) {
    this._selectedFields.push(fieldNumber);
  }

  get selectedFields() {
    return this._selectedFields;
  }

  resetSelectedFields() {
    this._selectedFields = [];
  }

  get name() {
    return this._name;
  }

  set name(name) {
    this._name = name;
  }

  set myTurn(isMyTurn) {
    this._myTurn = isMyTurn;
  }

  get myTurn() {
    return this._myTurn;
  }

  get score() {
    return this._score;
  }

  resetScore() {
    this._score = 0;
  }

  addVictory() {
    this._score += 1;
  }

  set mySign(sign) {
    this._mySign = sign;
  }

  get mySign() {
    return this._mySign;
  }
}
