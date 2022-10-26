class Character {
  name;
  endGame;
  alive = true;

  // Weapon that kills him
  object;

  constructor(name, object) {
    this.name = name.toUpperCase().trim();
    this.object = object;
    this.endGame = this.name === "PRINCESS";
  }
}

export default Character;
