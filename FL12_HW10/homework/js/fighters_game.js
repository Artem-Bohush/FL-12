class Fighter {
  constructor(props) {
    this._name = props.name;
    this._damage = props.damage;
    this._hp = props.hp;
    this._totalHp = props.hp;
    this._strength = props.strength;
    this._agility = props.agility;
    this._combatHistory = {
      wins: 0,
      losses: 0
    }
  }

  getName() {
    return this._name;
  }

  getDamage() {
    return this._damage;
  }

  getHealth() {
    return this._hp;
  }

  getStrength() {
    return this._strength;
  }

  getAgility() {
    return this._agility;
  }

  attack(defender) {
    const successChance = 100 / (100 - (defender.getStrength() + defender.getAgility()));
    const result = Math.round(-0.5 + Math.random() * successChance);
    if (result) {
      defender.dealDamage(this._damage);
      console.log(`${this._name} makes ${this._damage} damage to ${defender.getName()}`);
    } else {
      console.log(`${this._name} attack missed`);
    }
  }

  logCombatHistory() {
    console.log(`Name: ${this._name}, Wins: ${this._combatHistory.wins}, Losses: ${this._combatHistory.losses}`);
  }

  heal(value) {
    this._hp = this._hp + value;
    this._hp > this._totalHp ? this._hp = this._totalHp : this._hp;
  }

  dealDamage(value) {
    this._hp = this._hp - value;
    this._hp < 0 ? this._hp = 0 : this._hp;
  }

  addWin() {
    this._combatHistory.wins += 1;
  }

  addLoss() {
    this._combatHistory.losses += 1;
  }
}

const maximus = new Fighter({ name: 'Maximus', damage: 25, hp: 100, strength: 30, agility: 25 });
const commodus = new Fighter({ name: 'Commodus', damage: 25, hp: 90, strength: 30, agility: 25 });

function battle(fighter1, fighter2) {
  if (fighter1.getHealth() && fighter2.getHealth()) {
    for (; ;) {
      let whoStarts = Math.round(-0.5 + Math.random() * 2);
      if (whoStarts) {
        fighter1.attack(fighter2);
        if (!fighter2.getHealth()) {
          console.log(`${fighter1.getName()} has won!`);
          fighter1.addWin();
          fighter2.addLoss();
          break;
        }
        fighter2.attack(fighter1);
        if (!fighter1.getHealth()) {
          console.log(`${fighter2.getName()} has won!`);
          fighter2.addWin();
          fighter1.addLoss();
          break;
        }
      } else {
        fighter2.attack(fighter1);
        if (!fighter1.getHealth()) {
          console.log(`${fighter2.getName()} has won!`);
          fighter2.addWin();
          fighter1.addLoss();
          break;
        }
        fighter1.attack(fighter2);
        if (!fighter2.getHealth()) {
          console.log(`${fighter1.getName()} has won!`);
          fighter1.addWin();
          fighter2.addLoss();
          break;
        }
      }
    }
  } else {
    fighter1.getHealth() ? console.log(`${fighter2.getName()} is dead and can't to fight.`) :
      console.log(`${fighter1.getName()} is dead and can't to fight.`);
  }
}