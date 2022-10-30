import { CHARACTER_TYPES } from "../data/constants";

class Character {
  name;
  endGame;
  alive = true;

  // Weapon that kills him
  item;

  constructor(name, item = undefined) {
    this.name = name.toUpperCase().trim();
    this.item = item;
    this.endGame = this.name === CHARACTER_TYPES.princess;
  }
}

export default Character;
