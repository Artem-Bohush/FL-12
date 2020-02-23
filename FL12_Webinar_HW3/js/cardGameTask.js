// ---------------------------------------------- ES6 -------------------------------------------------

const _cards = Symbol('cards');
const _count = Symbol('count');
const _createCards = Symbol('createCards');

class Deck {
  constructor() {
    this[_cards] = this[_createCards]();
    this[_count] = this[_cards].length;
  }

  shuffle() {
    let randIndex;
    let temp;
    for (let i = 0; i < 3; i++) {
      for (let j = this[_cards].length - 1; j > 0; j--) {
        randIndex = Math.floor(Math.random() * (j + 1));
        temp = this[_cards][randIndex];
        this[_cards][randIndex] = this[_cards][j];
        this[_cards][j] = temp;
      }
    }
  }

  draw(n) {
    this[_count] -= n;
    return this[_cards].splice(this[_cards].length - n, n)[0];
  }

  get count() {
    return this[_count];
  }

  get cards() {
    return this[_cards];
  }

  [_createCards]() {
    const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    const cards = [];
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 13; j++) {
        cards.push(new Card(suits[i], j + 1));
      }
    }
    return cards;
  }
}

const _suit = Symbol('suit');
const _rank = Symbol('rank');
const _rankInfo = Symbol('rankInfo');
const _isFaceCard = Symbol('isFaceCard');

class Card {
  constructor(suit, rank) {
    this[_suit] = suit;
    this[_rank] = rank;
    this[_isFaceCard] = (this[_rank] === 1 || this[_rank] > 10) ? true : false;
    this[_rankInfo] = {
      1: 'Ace',
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      6: 6,
      7: 7,
      8: 8,
      9: 9,
      10: 10,
      11: 'Jack',
      12: 'Queen',
      13: 'King'
    }
  }

  toString() {
    console.log(`${this[_rankInfo][this[_rank]]} of ${this[_suit]}`);
  }

  get rank() {
    return this[_rank];
  }

  get isFaceCard() {
    return this[_isFaceCard];
  }

  static compare(cardOne, cardTwo) {
if (cardOne.rank > cardTwo.rank) {
  return 1;
} else if (cardOne.rank < cardTwo.rank) {
  return -1;
} else {
  return 0;
}
  }
}

const _name = Symbol('name');
const _wins = Symbol('wins');
const _deck = Symbol('deck');

class Player {
  constructor(name, deck) {
    this[_name] = name;
    this[_deck] = deck;
    this[_wins] = 0;
  }

  get name() {
    return this[_name];
  }

  get wins() {
    return this[_wins];
  }

  get deck() {
    return this[_deck];
  }

  addPoint() {
    this[_wins] += 1;
  }

  static play(playerOne, playerTwo) {
    if (!playerOne.deck.count) {
      console.log('The deck is empty!');
      return;
    }
    playerOne.deck.shuffle();
    playerTwo.deck.shuffle();
    while (playerOne.deck.count !== 0) {
      let card1 = playerOne.deck.draw(1);
      let card2 = playerTwo.deck.draw(1);
      let compareResult = Card.compare(card1, card2);
      if (compareResult > 0) {
        playerOne.addPoint();
      } else if (compareResult < 0) {
        playerTwo.addPoint();
      }
    }
    if (playerOne.wins > playerTwo.wins) {
      console.log(`${playerOne.name} wins ${playerOne.wins} to ${playerTwo.wins}`);
    } else if (playerOne.wins < playerTwo.wins) {
      console.log(`${playerTwo.name} wins ${playerTwo.wins} to ${playerOne.wins}`);
    } else {
      console.log('The game ended in a draw!');
    }
  }
}

const deck1 = new Deck();
const deck2 = new Deck();

const pete = new Player('Pete', deck1);
const john = new Player('John', deck2);

Player.play(pete, john);

// ---------------------------------------------- ES5 -------------------------------------------------

// function Deck() {
//   let _cards = createCards();
//   let _count = _cards.length;

//   this.shuffle = function () {
//     let randIndex;
//     let temp;
//     for (let i = 0; i < 3; i++) {
//       for (let j = _cards.length - 1; j > 0; j--) {
//         randIndex = Math.floor(Math.random() * (j + 1));
//         temp = _cards[randIndex];
//         _cards[randIndex] = _cards[j];
//         _cards[j] = temp;
//       }
//     }
//   }

//   this.draw = function (n) {
//     _count -= n;
//     return _cards.splice(_cards.length - n, n)[0];
//   }

//   this.getCount = function () {
//     return _count;
//   }

//   this.getCards = function () {
//     return _cards;
//   }

//   function createCards() {
//     const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
//     const cards = [];
//     for (let i = 0; i < 4; i++) {
//       for (let j = 0; j < 13; j++) {
//         cards.push(new Card(suits[i], j + 1));
//       }
//     }
//     return cards;
//   }
// }

// function Card(suit, rank) {
//   const _suit = suit;
//   const _rank = rank;
//   const _isFaceCard = (_rank === 1 || _rank > 10) ? true : false;
//   const _rankInfo = {
//     1: 'Ace',
//     2: 2,
//     3: 3,
//     4: 4,
//     5: 5,
//     6: 6,
//     7: 7,
//     8: 8,
//     9: 9,
//     10: 10,
//     11: 'Jack',
//     12: 'Queen',
//     13: 'King'
//   }

//   this.toString = function () {
//     console.log(`${_rankInfo[_rank]} of ${_suit}`);
//   }

//   this.getIsFaceCard = function () {
//     return _isFaceCard;
//   }

//   this.getRank = function () {
//     return _rank;
//   }
// }

// Card.compare = function (cardOne, cardTwo) {
//   if (cardOne.getRank() > cardTwo.getRank()) {
//     return 1;
//   } else if (cardOne.getRank() < cardTwo.getRank()) {
//     return -1;
//   } else {
//     return 0;
//   }
// }

// function Player(name, deck) {
//   let _name = name;
//   let _deck = deck;
//   let _wins = 0;

//   this.getDeck = function () {
//     return _deck;
//   }

//   this.addPoint = function () {
//     _wins += 1;
//   }

//   this.getWins = function () {
//     return _wins;
//   }

//   this.getName = function () {
//     return _name;
//   }
// }

// Player.play = function (playerOne, playerTwo) {
//   if (!playerOne.getDeck().getCount()) {
//     console.log('The deck is empty!');
//     return;
//   }
//   playerOne.getDeck().shuffle();
//   playerTwo.getDeck().shuffle();
//   while (playerOne.getDeck().getCount() !== 0) {
//     let card1 = playerOne.getDeck().draw(1);
//     let card2 = playerTwo.getDeck().draw(1);
//     let compareResult = Card.compare(card1, card2);
//     if (compareResult > 0) {
//       playerOne.addPoint();
//     } else if (compareResult < 0) {
//       playerTwo.addPoint();
//     }
//   }
//   if (playerOne.getWins() > playerTwo.getWins()) {
//     console.log(`${playerOne.getName()} wins ${playerOne.getWins()} to ${playerTwo.getWins()}`);
//   } else if (playerOne.getWins() < playerTwo.getWins()) {
//     console.log(`${playerTwo.getName()} wins ${playerTwo.getWins()} to ${playerOne.getWins()}`);
//   } else {
//     console.log('The game ended in a draw!');
//   }
// }

// const deck1 = new Deck();
// const deck2 = new Deck();


// const pete = new Player('Pete', deck1);
// const john = new Player('John', deck2);

// Player.play(pete, john);