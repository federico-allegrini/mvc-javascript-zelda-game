import { CHARACTER_TYPES } from "../data/constants";

class Character {
  name;
  endGame;
  alive = true;

  // Weapon that kills him
  object;

  constructor(name, object = undefined) {
    this.name = name.toUpperCase().trim();
    this.object = object;
    this.endGame = this.name === CHARACTER_TYPES.princess;
  }
}

export default Character;
