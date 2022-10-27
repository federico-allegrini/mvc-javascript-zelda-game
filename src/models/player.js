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
  message = "";
  end = false;

  room;
  // Only "Princess"
  character;
  // Bag
  objects = [];

  constructor(name, room) {
    this.name = name.toUpperCase().trim();
    this.room = room;
  }

  attack() {
    if (this.room.hasMonster()) {
      const monster = this.room.character;
      const weaponRequired = monster.object.name;
      if (this.hasWeapon(weaponRequired)) {
        this.message = `You attacked "${monster.name}" with the "${weaponRequired}", you killed the monster!`;
        monster.alive = false;
        this.room.unlock();
      } else {
        this.message = `You attacked "${monster.name}" without having the "${weaponRequired}", you are dead!`;
        this.end = true;
      }
    } else {
      this.message = `There is no monster in the room, you cannot attack!`;
    }
  }

  move() {}

  pick() {}

  drop() {}

  look() {}

  exit() {}

  hasWeapon(weapon) {
    for (const object of this.objects) {
      if (object.name === weaponRequired) {
        return true;
      }
    }
    return false;
  }
}

export default Player;
