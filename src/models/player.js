class Player {
  name;
  commands = {
    attack: this.attack,
    move: this.move,
    pick: this.pick,
    drop: this.drop,
    look: this.look,
    exit: this.exit,
  };

  room;
  // Only "Princess"
  character;
  // Bag
  objects = [];

  constructor(name, room) {
    this.name = name.toUpperCase().trim();
    this.room = room;
  }

  attack() {}

  move() {}

  pick() {}

  drop() {}

  look() {}

  exit() {}
}

export default Player;
